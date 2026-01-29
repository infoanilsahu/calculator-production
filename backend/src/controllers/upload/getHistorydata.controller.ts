import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";

export const getHistoryData = asyncHandler(async (req:Request, res:Response) => {
    if (!req.user) {
        throw new ApiError(401,"Unauthorized")
    }
    const {email} = req.user   
    if (!email) {
        throw new ApiError(402,"data not found for get history")
    }

    const history = await User.aggregate([
        {
            $match: {
                email: email?.toLocaleLowerCase()
            }
        },
        {
            $lookup: {
                from: "histories",
                localField: "_id",
                foreignField: "userId",
                as: "historyAll"
            }
        },
        {
            $addFields: {
                historyCount: {
                    $size: "$historyAll"
                }
            }
        },
        {
            $project: {
                email: 1,
                username: 1,
                historyCount: 1,
                historyAll: 1
            }
        },
    ])

    
    
    if (!history?.length) {
        throw new ApiError(403,"history data not found")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,history,"history data send successfully")
            )
})