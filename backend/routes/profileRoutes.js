import express from 'express'
import { editProfileById, getUserDetailById, loginUserDetail } from '../controller/ProfileController.js';

const profileRouter = express.Router();

profileRouter.get("/user-detail", loginUserDetail);
profileRouter.get("/user-detail/:userId", getUserDetailById);
profileRouter.put("/user-detail/edit", editProfileById)

export default profileRouter