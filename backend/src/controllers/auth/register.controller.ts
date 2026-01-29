import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {Request, Response} from 'express'

export const register = asyncHandler(async (req:Request, res:Response) => {
    const {email , username, password} = req.body
    const existUser = await User.findOne({email})
    if (existUser) {
        throw new ApiError(409,"User already exists")
    }

    const user = await User.create({
        email,
        username,
        password,
    })

    await user.save({validateBeforeSave: false})

    const newUser = await User.findById(user._id).select("-password -refreashtoken")
    if (!newUser) {
        throw new ApiError(404,"some went wrong on register user")
    }

    return res.status(200).json(
        new ApiResponse(200,newUser,"User successfully register")
    )

})



