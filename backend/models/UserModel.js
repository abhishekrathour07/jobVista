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
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: String, default: null },
        role: { type: String, enum: ['user', 'admin'], default: 'student' },
        appliedJobs: [{
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
            status: { type: String, enum: ['applied', 'accepted', 'rejected'], default: 'applied' },
            isapplied: { type: Boolean, default: false },
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