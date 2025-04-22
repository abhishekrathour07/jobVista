import express from 'express'
import { editProfileById, getUserDetailById, loginUserDetail } from '../controller/profileController.js';
import { multerMiddleware } from '../config/cloudanary.js';

const profileRouter = express.Router();

profileRouter.get("/user-detail", loginUserDetail);
profileRouter.get("/user-detail/:userId", getUserDetailById);
profileRouter.put("/user-detail/edit", multerMiddleware.fields([
    { name: "resumeUrl", maxCount: 3 },    // Allow up to 3 resume uploads
    { name: "profileImage", maxCount: 1 }
]), editProfileById)

export default profileRouter