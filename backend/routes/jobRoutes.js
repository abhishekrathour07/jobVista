import express from 'express'
import { deleteJobById, editJobById, getAllAppliedJob, getJobById, getPaginatedJobs, postJob } from '../controller/jobController.js';

const jobRouter = express.Router();

jobRouter.post("/post-job", postJob);
jobRouter.get("/jobs", getPaginatedJobs);
jobRouter.get("/jobs/:jobId", getJobById);
jobRouter.get("/user-detail/applied", getAllAppliedJob);
jobRouter.put("/edit-job/:jobId", editJobById)
jobRouter.delete("/delete-job/:jobId", deleteJobById)

export default jobRouter