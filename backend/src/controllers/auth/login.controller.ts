import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Request,Response } from "express";
import { generateToken } from "../token/generateToken.controller.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { CookieOptions } from "express";



export const login = asyncHandler(async (req:Request, res:Response) => {
    const {email,password} = req.body
    if (!email) {
        throw new ApiError(404,"Email is Required")
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404,"User not exists")
    }

    const isUserOk = await user.isPasswordCorrect(password);
    if (!isUserOk) {
        throw new ApiError(401,"Incorrect password")
    }

    const {accessToken,refreshToken} = await generateToken(user._id.toString());  

    const loggedUser = await User.findById(user._id).select("-password -refreashtoken")

    const option: CookieOptions = {
        httpOnly: true,
        secure: false,     // production - secure: trure
        sameSite: "lax",   // production - sameSite: "none"
    }

    return res.status(200)
        .cookie("refreshToken",refreshToken,option)
        .cookie("accessToken",accessToken,option)
        .json(
            new ApiResponse(200,loggedUser,"User successfully login")
        )



})