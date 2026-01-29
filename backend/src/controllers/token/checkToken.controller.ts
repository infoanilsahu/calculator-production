import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const checkToken = asyncHandler(async (req:Request, res:Response) => {
    const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer","").trim()
    if (!token) {
        return res.status(401).json(
            new ApiResponse(401,{success: false},"Unauthorized")
        )
    }

    return res.status(200).json(
        new ApiResponse(200,{success: true},"User is logged in")
    )
})