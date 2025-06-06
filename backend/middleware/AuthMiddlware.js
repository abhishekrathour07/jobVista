import jwt from 'jsonwebtoken'
import responseHandler from '../utils/responseHandler.js'

const authMiddleware = (req, res, next) => {
    const authToken = req?.cookies?.auth_token;
    if (!authToken) {
        return responseHandler(res, 401, "Authentication required please provide a token");

    }
    try {
        const decode = jwt.verify(authToken,process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        return responseHandler(res,401,"Invalid or expired token , please try again")
    }
}

export default authMiddleware
