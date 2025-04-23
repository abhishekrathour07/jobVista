import jobModel from "../models/jobModel.js";
import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";

const savedjob = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const  {jobId}  = req.body;

        const userDetail = await userModel.findById(loggedInUserId);
        const job = await jobModel.findById(jobId);

        if (!job) {
            return responseHandler(res, 404, "Job not found, it may have been deleted by admin");
        }

        const jobIdStr = jobId.toString();
        const alreadySaved = userDetail.savedJobs.some(id => id.toString() === jobIdStr);

        if (alreadySaved) {
            userDetail.savedJobs = userDetail.savedJobs.filter(id => id.toString() !== jobIdStr);
            await userDetail.save();
            return responseHandler(res, 200, "Job removed from saved jobs");
        } else {
            userDetail.savedJobs.push(job._id);
            await userDetail.save();
            return responseHandler(res, 200, "Job added to saved jobs");
        }

    } catch (error) {
        return responseHandler(res, 500, "Something went wrong", { error: error.message });
    }
};

const getSavedJobs = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const loggedInUserId = req.user._id;

        const userDetail = await userModel.findById(loggedInUserId)
            .populate({
                path: "savedJobs",
                select: "jobtitle salaryRange location companyname updatedAt status jobType workplaceType deadline"
            }).sort({ postedAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalsavedJobs = userDetail.savedJobs.length;

        const responseData = {
            totalsavedJobs,
            currentPage: page,
            totalPages: Math.ceil(totalsavedJobs / limit),
            savedData: userDetail.savedJobs
        }
        return responseHandler(res, 200, "Saved job data fetched successfully", responseData);
    } catch (error) {
        return responseHandler(res, 500, "Something went wrong", { error: error.message });
    }
};


export { savedjob, getSavedJobs };
