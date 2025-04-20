import express from 'express'
import { getPaginatedJobs, postJob } from '../controller/jobController.js';

const jobRouter = express.Router();

jobRouter.post("/post-job", postJob);
jobRouter.get("/jobs", getPaginatedJobs);

export default jobRouter