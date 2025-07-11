import jobModel from "../models/jobModel.js";
import responseHandler from "../utils/responseHandler.js";
import userModel from "../models/UserModel.js";
import { uploadFileToCloudinary } from "../config/cloudanary.js";


const postJob = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const { jobtitle, companyname, companySize, companyUrl, companyInfo, industryType, workplaceType, foundedAt, location, status, jobType, skills, salaryRange, deadline, experience, jobDescription, requirements, tags } = req.body;

        const loggedInUser = await userModel.findById(loggedInUserId)

        let mediaUrl = null;
        if (req.file) {
            const uploadToCloudinary = await uploadFileToCloudinary(req.file);
            mediaUrl = uploadToCloudinary?.secure_url;
        }

        if (loggedInUser.role !== 'admin') {
            return responseHandler(res, 403, "Permission Denied ");
        }

        if (!jobtitle || !companyname || !industryType || !location || !jobType || !salaryRange || !deadline) {
            return responseHandler(res, 400, "All field are required")
        }

        const newJob = await jobModel.create({
            jobtitle,
            companyname,
            companyLogo: mediaUrl,
            companyUrl,
            companyInfo,
            industryType,
            workplaceType,
            foundedAt,
            location,
            status,
            jobType,
            skills,
            salaryRange,
            deadline,
            experience,
            jobDescription,
            companySize,
            requirements,
            postedBy: loggedInUserId,
            tags
        });

        return responseHandler(res, 200, "Job created successfully", newJob)
    } catch (error) {
        responseHandler(res, 500, "Internal server error", { error: error.message })
    }
};

const getPaginatedJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const loggedInUserId = req.user._id;

        // Extract filter parameters
        const { search, jobType, location, experience } = req.query;
        
        // Build filter object
        let filter = {};
        
        // Search filter - search in job title, company name, and skills
        if (search) {
            filter.$or = [
                { jobtitle: { $regex: search, $options: 'i' } },
                { companyname: { $regex: search, $options: 'i' } },
                { skills: { $in: [new RegExp(search, 'i')] } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }
        if (jobType && jobType !== 'all') {
            filter.jobType = jobType;
        }
        if (location && location !== 'all') {
            filter.location = { $regex: location, $options: 'i' };
        }
        if (experience && experience !== 'all') {
            filter.experience = { $regex: experience, $options: 'i' };
        }

        const jobs = await jobModel
            .find(filter)
            .select("companyLogo jobtitle companyname location companyInfo status skills tags salaryRange applicants postedAt applicationCount deadline jobType experience")
            .sort({ postedAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalJobs = await jobModel.countDocuments(filter);
        const jobApplicants = jobs.map(data => {
            const isApplied = data.applicants.some(id => id.toString() === loggedInUserId.toString());
            return { ...data._doc, isApplied };
        });

        return responseHandler(res, 200, "Jobs fetched successfully", {
            totalJobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            jobs: jobApplicants,
        });
    } catch (error) {
        return responseHandler(res, 500, "Failed to fetch jobs", error.message);
    }
};

const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const loggedInUserId = req.user._id;

        if (!jobId) {
            return responseHandler(res, 400, "Job ID is required");
        }
        const job = await jobModel.findById(jobId);
        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }
        const isApplied = job.applicants.includes(loggedInUserId)
        const userDetail = await userModel.findById(loggedInUserId)
        const isSaved = userDetail.savedJobs.includes(jobId)

        const response = {
            job,
            isApplied: isApplied,
            isSaved: isSaved
        }

        return responseHandler(res, 200, "Job fetched successfully", response);
    } catch (error) {
        return responseHandler(res, 500, "Failed to fetch job", { error: error.message });
    }
};

const editJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const loggedInUserId = req.user._id;

        const loggedInUser = await userModel.findById(loggedInUserId);
        if (!loggedInUser || loggedInUser.role !== 'admin') {
            return responseHandler(res, 403, "Permission Denied");
        }

        const job = await jobModel.findById(jobId);
        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }

        if (req.files && req.files.companyLogo && req.files.companyLogo[0]) {
            const uploadedLogo = await uploadFileToCloudinary(req.files.companyLogo[0]);
            if (uploadedLogo?.secure_url) {
                job.companyLogo = uploadedLogo.secure_url;
            }
        }

        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined) {
                job[key] = req.body[key];
            }
        });

        await job.save();

        return responseHandler(res, 200, "Job updated successfully", job);

    } catch (error) {
        console.error(error);
        return responseHandler(res, 500, "Failed to update job", { error: error.message });
    }
};


const deleteJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await jobModel.findById(jobId);
        const loggedInUserId = req.user._id;

        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }

        if (loggedInUserId.toString() === job.postedBy.toString()) {
            await jobModel.findByIdAndDelete(jobId);

            // Remove job references from all users' appliedJobs
            await userModel.updateMany(
                { "appliedJobs.jobId": jobId },
                { $pull: { appliedJobs: { jobId: jobId } } }
            );

            // also remove from savedJobs 
            await userModel.updateMany(
                { savedJobs: jobId },
                { $pull: { savedJobs: jobId } }
            );
            return responseHandler(res, 200, "Job deleted successfully");
        } else {
            return responseHandler(res, 403, "You are not Authorised to delete the job");
        }

    } catch (error) {
        console.error(error);
        return responseHandler(res, 500, "Failed to delete job", { error: error.message });
    }
}

const getAllAppliedJob = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const user = await userModel.findById(loggedInUserId).populate({
            path: 'appliedJobs.jobId',
            select: 'jobtitle companyname location salaryRange jobType status'
        })
        if (!user) {
            return responseHandler(res, 404, "User not found");
        }

        const appliedJobs = user.appliedJobs.map(job => ({
            jobDetails: job.jobId, // Populated job details
            status: job.status,
            appliedAt: job.appliedAt
        }));

        return responseHandler(res, 200, "Applied jobs fetched successfully", appliedJobs);
    } catch (error) {
        console.error(error);
        return responseHandler(res, 500, "Failed to fetch jobs", { error: error.message });
    }
};






export { postJob, getPaginatedJobs, getJobById, getAllAppliedJob, editJobById, deleteJobById }
