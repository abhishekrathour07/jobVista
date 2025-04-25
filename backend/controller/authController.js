import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


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
        const existUser = await userModel.findOne({ email })

        if (!existUser) {
            return responseHandler(res, 404, "User not found");
        }
        const passwordCorrect = await bcrypt.compare(password, existUser.password);
        if (!passwordCorrect) {
            return responseHandler(res, 401, "Incorrect password")
        }

        const token = jwt.sign(
            { email: existUser.email, _id: existUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        });

        return responseHandler(res, 200, "Login Successfully", {
            userId: existUser._id,
            name: existUser.name,
            role: existUser.role,
            profileImage: existUser.profileImage
        });



    } catch (error) {
        responseHandler(res, 500, "Internal server Error", error);
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



export { login, signup, logout }