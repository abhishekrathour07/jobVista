import jobApplicationModel from "../models/jobApplicationModel.js";
import jobModel from "../models/jobModel.js";
import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";


const applyToJob = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { jobId } = req.params;
        const { resumeUrl, coverLetter } = req.body;

        if (!jobId || !resumeUrl) {
            return responseHandler(res, 400, "Job ID and Resume URL are required.");
        }

        const jobExists = await jobModel.findById(jobId);
        if (!jobExists) {
            return responseHandler(res, 404, "Job not found.");
        }

        const alreadyApplied = await jobApplicationModel.findOne({ jobId, applicantId: loggedInUserId });
        if (alreadyApplied) {
            return responseHandler(res, 400, "you are already applied in this job")
        }
        const application = await jobApplicationModel.create({
            jobId,
            applicantId: loggedInUserId,
            resumeUrl,
            coverLetter
        });

        const loggedInUser = await userModel.findById(loggedInUserId);
        loggedInUser.appliedJobs.push({jobId})
        await loggedInUser.save();

        await jobModel.findByIdAndUpdate(jobId, {
            $addToSet: { applicants: loggedInUserId }, // agar user pehle apply kar chuka ho to dobara add na ho
            $inc: { applicationCount: 1 } // har apply pe count badhao
        });

        return responseHandler(res, 200, "Application submitted successfully", application)

    } catch (error) {
        return responseHandler(res, 500, "Error while applying job", error.message)
    }
}

export { applyToJob }