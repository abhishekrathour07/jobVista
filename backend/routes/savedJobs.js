import express from 'express'
import { getSavedJobs, savedjob } from '../controller/savedJobController.js';

const savedRouter = express.Router();

savedRouter.post("/saved-job",savedjob)
savedRouter.get("/get/saved-job",getSavedJobs)

export default savedRouter