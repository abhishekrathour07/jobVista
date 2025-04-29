import { uploadFileToCloudinary } from "../config/cloudanary.js";
import jobApplicationModel from "../models/jobApplicationModel.js";
import jobModel from "../models/jobModel.js";
import userModel from "../models/UserModel.js";
import { adminEmailforApplyingInJob } from "../template/adminEmailforApplyingInJob.js";
import { notifyApplicantJobStatusChange } from "../template/notifyApplicantJobStatusChange.js";
import responseHandler from "../utils/responseHandler.js";
import ExcelJS from "exceljs";


const applyToJob = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const { jobId } = req.params
        const { coverLetter } = req.body

        const loggedInUser = await userModel.findById(loggedInUserId)

        if (!jobId || !req.file) {
            return responseHandler(res, 400, 'Job ID and Resume file are required.')
        }
        let mediaUrl = null;
        if (req.file) {
            const uploadToCloudinary = await uploadFileToCloudinary(req.file);
            mediaUrl = uploadToCloudinary?.secure_url;
        }

        if (loggedInUser.role === 'admin') {
            return responseHandler(res, 403, 'Admin is not allowed to apply for a job')
        }

        const job = await jobModel.findById(jobId).populate("postedBy", "email")

        if (!job) {
            return responseHandler(res, 404, 'Job not found.')
        }


        const alreadyApplied = await jobApplicationModel.findOne({ jobId, applicantId: loggedInUserId })
        if (alreadyApplied) {
            return responseHandler(res, 400, 'You have already applied for this job.')
        }


        const application = await jobApplicationModel.create({
            jobId,
            applicantId: loggedInUserId,
            resumeUrl: mediaUrl,
            coverLetter,
            alreadyApplied: true
        })

        loggedInUser.appliedJobs.push({
            jobId: jobId,
            status: 'applied',
            isapplied: true,
            appliedAt: new Date()
        })
        await loggedInUser.save()


        await jobModel.findByIdAndUpdate(jobId, {
            $addToSet: { applicants: loggedInUserId },
            $inc: { applicationCount: 1 }
        })

        adminEmailforApplyingInJob(job.postedBy.email, loggedInUser.name, loggedInUser.email, job.jobtitle)

        return responseHandler(res, 200, 'Application submitted successfully', application)
    } catch (error) {
        return responseHandler(res, 500, 'Error while applying job', error.message)
    }
}


const getApplicationByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await jobModel.findById(jobId);
        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }

        const applicantsDetail = await jobApplicationModel.find({ jobId })
            .populate("applicantId jobId", "name companyname status email profileImage skills location");

        return responseHandler(res, 200, "Applicants detail fetched successfully", applicantsDetail)
    } catch (error) {
        return responseHandler(res, 500, "Error while applying job", error.message)
    }
}

const userStatsData = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const userDetail = await userModel.findById(loggedInUserId);
        const totalAppliedJobs = userDetail.appliedJobs.length;
        const totalSavedJobs = userDetail.savedJobs.length;
        const totalJobs = await jobModel.countDocuments();


        const stats = {
            totalJobs: totalJobs,
            totalAppliedJobs: totalAppliedJobs,
            totalSavedJob: totalSavedJobs
        }
        return responseHandler(res, 200, 'Stats data fetched successfully', stats)

    } catch (error) {
        return responseHandler(res, 500, "Error while applying job", error.message)

    }

}



const changeApplicantStatus = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { status, applicationId } = req.body;

        const job = await jobModel.findById(jobId);
        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }

        const jobApplicationDetail = await jobApplicationModel.findById(applicationId).populate("jobId", "jobtitle");
        if (!jobApplicationDetail) {
            return responseHandler(res, 404, "Job application not found");
        }
        jobApplicationDetail.status = status;
        await jobApplicationDetail.save();

        const user = await userModel.findById(jobApplicationDetail.applicantId);
        if (!user) {
            return responseHandler(res, 404, "User not found");
        }

        const jobEntry = user.appliedJobs.find(entry => entry.jobId.toString() === jobId.toString());
        if (jobEntry) {
            jobEntry.status = status;
            await user.save();
        }
        notifyApplicantJobStatusChange(user.email, user.name, jobApplicationDetail.jobId.jobtitle, status)
        return responseHandler(res, 200, `Applicant's status changed to ${status}`);

    } catch (error) {
        return responseHandler(res, 500, "Error while changing status", error.message);
    }
};




 const downloadApplicantsExcel = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await jobModel.findById(jobId);
        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }

        const applicants = await jobApplicationModel.find({ jobId })
            .populate("applicantId", "name email profileImage skills location")
            .populate("jobId", "jobtitle companyname");

        if (applicants.length === 0) {
            return responseHandler(res, 404, "No applications found for this job");
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Applicants");

        worksheet.columns = [
            { header: "JobTitle", key: "jobTitle", width: 25 },
            { header: "CompanyName", key: "companyName", width: 25 },
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Location", key: "location", width: 20 },
            { header: "ResumeURL", key: "resumeUrl", width: 70 },
            { header: "Status", key: "status", width: 15 },
        ];

        const rows = applicants.map(app => ({
            jobTitle: app?.jobId?.jobtitle || "-",
            companyName: app?.jobId?.companyname || "-",
            name: app?.applicantId?.name || "-",
            email: app?.applicantId?.email || "-",
            location: app?.applicantId?.location || "-",
            resumeUrl: app?.resumeUrl || "-",
            status: app?.status || "-",
        }));

        worksheet.addRows(rows);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=applicants_list.xlsx");

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Excel export error:", error);
        return responseHandler(res, 500, "Error while generating Excel file", error.message);
    }
};




export { applyToJob, getApplicationByJobId, userStatsData, changeApplicantStatus, downloadApplicantsExcel }