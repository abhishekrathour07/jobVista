import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";


const loginUserDetail = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const userDetail = await userModel.findById(loggedInUserId).select("-password");

        return responseHandler(res, 200, "user detail fetched successfully", userDetail);

    } catch (error) {
        console.log(error)
        responseHandler(res, 500, "Internal server Error", error);
    }
}

const getUserDetailById = async (req, res) => {
    try {
        const { userId } = req.params;

        const userDetail = await userModel.findById(userId).select("-password");

        return responseHandler(res, 200, "User data fetched successfully", userDetail);
    } catch (error) {
        console.log(error)
        responseHandler(res, 500, "Internal server Error", error);
    }
}

const editProfileById = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const userDetail = await userModel.findById(loggedInUserId);

        if (!userDetail) {
            return responseHandler(res, 404, "User not found");
        }
        Object.keys(req.body).forEach((key) => {
            if (key === 'password' || key === 'role') {
                return responseHandler(res, 403, "You cannot update password or role directly");
            }
            else if (req.body[key] !== undefined) {
                userDetail[key] = req.body[key]
            }
        })
        await userDetail.save();

        return responseHandler(res, 200, "Profile updated successfully", userDetail);

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, "Internal server error", { error: error.message });
    }
};


export { loginUserDetail, editProfileById, getUserDetailById }