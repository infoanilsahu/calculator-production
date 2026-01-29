import { Request,Response } from "express";
import { ApiError } from "../../utils/ApiError.js";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


interface RefreshTokenPayload extends JwtPayload {
    _id: string;
}

const getUserData = asyncHandler(async (req:Request, res:Response) => {
    if (!req.user) {
        throw new ApiError(401,"Unauthorized")
    }

    const user = await User.findById(req.user?._id).select("email username")

    return res.status(200).json(
        new ApiResponse(200,user,"user data send successfully")
    )
    
})

export {getUserData};