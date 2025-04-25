import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const updatePassword = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        const userDetail = await userModel.findById(loggedInUserId);

        if (!userDetail) {
            return responseHandler(res, 404, "User not found");
        }

        const passwordMatch = await bcrypt.compare(currentPassword, userDetail.password);

        if (!passwordMatch) {
            return responseHandler(res, 400, "Current password is incorrect. Try again.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        userDetail.password = hashedPassword;
        await userDetail.save();

        return responseHandler(res, 200, "Password updated successfully");
    } catch (error) {
        return responseHandler(res, 500, "Something went wrong", { error: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const deletedUser = await userModel.findByIdAndDelete(loggedInUserId);

        if (!deletedUser) {
            return responseHandler(res, 404, "User not found");
        }
        res.clearCookie('auth_token');
        return responseHandler(res, 200, "Account deleted successfully");

    } catch (error) {
        return responseHandler(res, 500, "Something went wrong", { error: error.message });
    }
}


export { updatePassword, deleteAccount }
