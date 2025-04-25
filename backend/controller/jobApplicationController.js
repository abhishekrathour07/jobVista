import { uploadFileToCloudinary } from "../config/cloudanary.js";
import jobApplicationModel from "../models/jobApplicationModel.js";
import jobModel from "../models/jobModel.js";
import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";


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

        const jobExists = await jobModel.findById(jobId)
        if (!jobExists) {
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

        const jobApplicationDetail = await jobApplicationModel.findById(applicationId);
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

        return responseHandler(res, 200, `Applicant's status changed to ${status}`);
    } catch (error) {
        return responseHandler(res, 500, "Error while changing status", error.message);
    }
};


export { applyToJob, getApplicationByJobId, userStatsData, changeApplicantStatus }