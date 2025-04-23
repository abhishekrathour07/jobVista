import express from "express"
import { applyToJob, getApplicationByJobId } from "../controller/jobApplicationController.js"
import { multerMiddleware } from "../config/cloudanary.js"

const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId", multerMiddleware.single("resumeUrl"), applyToJob)
applicationRouter.get("/apply/applicants/:jobId", getApplicationByJobId)

export default applicationRouter