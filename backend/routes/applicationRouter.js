import express from "express"
import { applyToJob } from "../controller/jobApplicationController.js"

const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId",applyToJob)

export default applicationRouter