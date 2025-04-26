import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        jobtitle: { type: String, required: true },
        companyname: { type: String, required: true },
        companyLogo: { type: String, default:null},
        companyUrl: { type: String, default: "Not provided" },
        companyInfo: { type: String },
        industryType: { type: String, required: true },
        workplaceType: {
            type: String,
            enum: ['remote', 'onsite', 'hybrid'],
            default: 'remote',
            lowercase: true
        },
        companySize: { type: String },
        foundedAt: { type: String },
        location: { type: String, required: true },
        status: {
            type: String,
            enum: ['active', 'closed'],
            default: 'active'
        },
        jobType: {
            type: String,
            enum: ['fulltime', 'parttime', 'internship'],
            default: 'fulltime'
        },
        skills: [{ type: String }],
        salaryRange: { type: String, required: true },
        deadline: { type: Date, required: true },
        experience: { type: String },
        jobDescription: { type: String },
        requirements: [{ type: String }],
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        postedAt: { type: Date, default: Date.now },
        applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        applicationCount: { type: Number, default: 0 },
        tags: [{ type: String }] // it is used to perform filtering 
    },
    {
        timestamps: true,
        toJSON: { getters: true }
    }
);

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;
