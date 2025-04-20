import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        status: { type: String, enum: ['pending', 'accepted', 'rejected', 'under review'], default: 'pending' },
        resumeUrl: { type: String, required: true },
        coverLetter: { type: String },
    },
    {
        timestamps: true,
        toJSON: { getters: true }
    }
)


const jobApplicationModel = mongoose.model("user-application", jobApplicationSchema);
export default jobApplicationModel