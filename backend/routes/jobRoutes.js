import express from 'express'
import { getJobById, getPaginatedJobs, postJob } from '../controller/jobController.js';

const jobRouter = express.Router();

jobRouter.post("/post-job", postJob);
jobRouter.get("/jobs", getPaginatedJobs);
jobRouter.get("/jobs/:jobId", getJobById);

export default jobRouter