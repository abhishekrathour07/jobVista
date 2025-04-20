import express from "express"
import { applyToJob, getApplicationByJobId } from "../controller/jobApplicationController.js"

const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId",applyToJob)
applicationRouter.get("/apply/applicants/:jobId",getApplicationByJobId)

export default applicationRouter