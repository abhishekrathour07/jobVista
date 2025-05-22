import express from "express"
import { adminDashboardStats, applyToJob, changeApplicantStatus, downloadApplicantsExcel, getApplicationByJobId, userStatsData } from "../controller/jobApplicationController.js"
import { multerMiddleware } from "../config/cloudanary.js"

const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId", multerMiddleware.single("resumeUrl"), applyToJob)
applicationRouter.get("/apply/applicants/:jobId", getApplicationByJobId)
applicationRouter.get("/user/stats", userStatsData)
applicationRouter.get("/admin/stats", adminDashboardStats)
applicationRouter.put("/applicants/status/:jobId", changeApplicantStatus)
applicationRouter.get("/download/applicant-list/:jobId", downloadApplicantsExcel)

export default applicationRouter 