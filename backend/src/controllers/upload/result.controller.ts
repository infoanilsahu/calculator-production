import { asyncHandler } from "../../utils/asyncHandler.js";
import { Request,Response } from "express";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { History } from "../../models/history.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { ApiResponse } from "../../utils/ApiResponse.js";

interface RefreshTokenPayload extends JwtPayload {
    _id: string;
}


export const result = asyncHandler(async (req:Request, res:Response) => {
    if (!req.user) {
        throw new ApiError(401,"Unauthorized")
    }

    const {path,input,answer} = req.body
    

    try {
    
        const user = await User.findById(req.user?._id)
        if (!user) {
            throw new ApiError(402,"Invalid refresh token")
        }

        const newHistory = await History.create({
            path,
            input,
            answer,
            userId: user._id,
        })

        user.historyId.push(newHistory._id)

        await user.save({validateBeforeSave: false})

        return res
                .status(200)
                .json(
                    new ApiResponse(200,newHistory,"history store successfully")
                )

    } catch (err: any) {
        console.log("error : ",err);
        if (err instanceof ApiError) {
            throw err; // DO NOT swallow real errors
        }
        throw new ApiError(401,"Invalid is not valid")
    }
})


