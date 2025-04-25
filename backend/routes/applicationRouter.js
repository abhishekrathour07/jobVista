import express from "express"
import { applyToJob, changeApplicantStatus, getApplicationByJobId, userStatsData } from "../controller/jobApplicationController.js"
import { multerMiddleware } from "../config/cloudanary.js"

const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId", multerMiddleware.single("resumeUrl"), applyToJob)
applicationRouter.get("/apply/applicants/:jobId", getApplicationByJobId)
applicationRouter.get("/user/stats", userStatsData)
applicationRouter.put("/applicants/status/:jobId", changeApplicantStatus)

export default applicationRouter