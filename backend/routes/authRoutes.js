import express from 'express'
import { forgotPassword, login, logout, resetPassword, signup, testCookie } from '../controller/authController.js';


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/forgot-password/:token", resetPassword);
authRouter.get("/test-cookie", testCookie);

export default authRouter
