import express from 'express'
import { login, loginUserDetail, logout, signup } from '../controller/authController.js';
import authMiddleware from "../middleware/AuthMiddlware.js";


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/user-detail", authMiddleware, loginUserDetail);

export default authRouter
