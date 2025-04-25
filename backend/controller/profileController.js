import { uploadFileToCloudinary } from "../config/cloudanary.js";
import userModel from "../models/UserModel.js";
import responseHandler from "../utils/responseHandler.js";


const loginUserDetail = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const userDetail = await userModel.findById(loggedInUserId).select("-password");

        return responseHandler(res, 200, "user detail fetched successfully", userDetail);

    } catch (error) {
        responseHandler(res, 500, "Internal server Error", error);
    }
}

const getUserDetailById = async (req, res) => {
    try {
        const { userId } = req.params;

        const userDetail = await userModel.findById(userId).select("-password");

        return responseHandler(res, 200, "User data fetched successfully", userDetail);
    } catch (error) {
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

        // Upload files if available
        if (req.files) {
            if (req.files.profileImage && req.files.profileImage[0]) {
                const uploadedImage = await uploadFileToCloudinary(req.files.profileImage[0]);
                if (uploadedImage?.secure_url) {
                    userDetail.profileImage = uploadedImage.secure_url;
                }
            }

            if (req.files.resumeUrl && req.files.resumeUrl[0]) {
                const uploadedResume = await uploadFileToCloudinary(req.files.resumeUrl[0]);
                if (uploadedResume?.secure_url) {
                    userDetail.resumeUrl = uploadedResume.secure_url;
                }
            }
        }

        // Update other fields except password and role
        Object.keys(req.body).forEach((key) => {
            if (["password", "role"].includes(key)) return;
            if (req.body[key] !== undefined) {
                userDetail[key] = req.body[key];
            }
        });

        await userDetail.save();
        return responseHandler(res, 200, "Profile updated successfully", userDetail);

    } catch (error) {
        return responseHandler(res, 500, "Internal server error", { error: error.message });
    }
};



export { loginUserDetail, editProfileById, getUserDetailById }