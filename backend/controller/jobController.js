import jobModel from "../models/jobModel.js";
import responseHandler from "../utils/responseHandler.js";
import userModel from "../models/UserModel.js";


const postJob = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const { jobtitle, companyname, companyLogo, companyUrl, companyInfo, industryType, workplaceType, foundedYear, location, status, jobType, skills, salaryRange, deadline, experience, jobDescription, requirements, tags } = req.body;

        const loggedInUser = await userModel.findById(loggedInUserId)

        if (loggedInUser.role !== 'admin') {
            return responseHandler(res, 403, "Permission Denied ");
        }

        if (!jobtitle || !companyname || !industryType || !location || !jobType || !salaryRange || !deadline) {
            return responseHandler(res, 400, "All field are required")
        }

        const newJob = await jobModel.create({
            jobtitle,
            companyname,
            companyLogo,
            companyUrl,
            companyInfo,
            industryType,
            workplaceType,
            foundedYear,
            location,
            status,
            jobType,
            skills,
            salaryRange,
            deadline,
            experience,
            jobDescription,
            requirements,
            postedBy: loggedInUserId,
            tags
        });

        return responseHandler(res, 200, "Job created successfully", newJob)
    } catch (error) {
        responseHandler(res, 500, "Internal server error", error)
    }
};

const getPaginatedJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const jobs = await jobModel
            .find()
            .select("companylogo jobtitle companyname location companyInfo status skills tags applicationCount")
            .sort({ postedAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalJobs = await jobModel.countDocuments();

        return responseHandler(res, 200, "Jobs fetched successfully", {
            totalJobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            jobs,
        });
    } catch (error) {
        return responseHandler(res, 500, "Failed to fetch jobs", error.message);
    }
};

const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;

        if (!jobId) {
            return responseHandler(res, 400, "Job ID is required");
        }
        const job = await jobModel.findById(jobId);
        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }
        return responseHandler(res, 200, "Job fetched successfully", job);
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

        if (!req.body || typeof req.body !== 'object') {
            return responseHandler(res, 400, "Invalid request body");
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

        if (!job) {
            return responseHandler(res, 404, "Job not found");
        }

        await jobModel.findByIdAndDelete(jobId)
        return responseHandler(res, 200, "Job deleted successfully")

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
