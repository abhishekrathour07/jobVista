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

        if (!jobtitle || !companyname  || !industryType || !location || !jobType || !salaryRange || !deadline) {
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
            .select("companylogo jobtitle companyname location companyInfo status skills")
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

export { postJob, getPaginatedJobs }
