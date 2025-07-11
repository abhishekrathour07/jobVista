import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { sendforgetPasswordLinkToEmail } from "../template/forgotPasswordTemplate.js";


const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return responseHandler(res, 400, "User already exist you can login");
        }

        const newUser = new userModel({ name, email, password, role })
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        responseHandler(res, 200, "Account created successfully");

    } catch (error) {
        responseHandler(res, 500, "Internal server Error", error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModel.findOne({ email });

        if (!existUser) {
            return responseHandler(res, 404, "User not found");
        }

        const passwordCorrect = await bcrypt.compare(password, existUser.password);
        if (!passwordCorrect) {
            return responseHandler(res, 401, "Incorrect password");
        }

        const token = jwt.sign(
            { email: existUser.email, _id: existUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'Lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return responseHandler(res, 200, "Login Successfully", {
            userId: existUser._id,
            name: existUser.name,
            role: existUser.role,
            profileImage: existUser.profileImage
        });

    } catch (error) {
        responseHandler(res, 500, "Internal server Error", { error: error.message });
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('auth_token');
        return responseHandler(res, 200, "Logout Successfully");

    } catch (error) {
        responseHandler(res, 500, "Internal server Error", error);
    }
}



const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return responseHandler(res, 400, "No account found with this email");
        }

        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = Date.now() + 600000;//10 min
        await user.save();

        await sendforgetPasswordLinkToEmail(user.email, resetPasswordToken);

        return responseHandler(res, 200, "Reset link send to your email");
    } catch (error) {
        return responseHandler(res, 500, "Internal server error", error.message);
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return responseHandler(res, 400, "Token is expired!!");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return responseHandler(res, 200, "Your password has been reset successfully.");

    } catch (error) {
        return responseHandler(res, 500, "Internal server error", error.message);
    }
}


export { login, signup, logout, forgotPassword, resetPassword }