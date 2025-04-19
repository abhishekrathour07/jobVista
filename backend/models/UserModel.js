import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        resumeUrl: { type: String },
        profileImage: { type: String, default: null },
        phone: { type: String },
        skills: [{ type: String }],
        location: { type: String },
        role: { type: String, enum: ['student', 'admin'], default: 'student' },
        appliedJobs: [{
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
            status: { type: String, enum: ['applied', 'accepted', 'rejected'], default: 'applied' },
            appliedAt: { type: Date, default: Date.now }
        }],
        savedJobs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }],
    },
    {
        timestamps: true,
        toJSON: { getters: true }
    }
)

const userModel = mongoose.model("user", userSchema)
export default userModel