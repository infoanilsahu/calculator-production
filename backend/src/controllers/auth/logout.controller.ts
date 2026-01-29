import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../../models/user.model.js";
import { CookieOptions } from "express";
import { ApiResponse } from "../../utils/ApiResponse.js";


interface RefreshTokenPayload extends JwtPayload {
    _id: string;
}


export const logout = asyncHandler(async (req:Request,res:Response) => {
    const token = req.cookies.refreshToken
    if (!token) {
        throw new ApiError(402,"User token not found");
    }

    const decodedToken = await jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload
    if (!decodedToken) {
        throw new ApiError(402,"Invalid token")
    }

    await User.findByIdAndUpdate(decodedToken._id, {
        $set: {
            refreashtoken: ""
        }
    },{new: true}) 

    const option: CookieOptions = {
            httpOnly: true,
            secure: false,     // production - secure: trure
            sameSite: "lax",   // production - sameSite: "none"
    }

    return res.status(200)
        .clearCookie("accessToken",option)
        .clearCookie("refreshToken",option)
        .json(
            new ApiResponse(200,{},"User is logout successfully")
        )

})