import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt,{JwtPayload} from 'jsonwebtoken'
import { User } from "../models/user.model.js";

interface TokenPayload extends JwtPayload {
    _id: string;
}

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ","")
    if (!token) {
        throw new ApiError(500,"Unauthorized")
    }

    try {
        const decodedToken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!) as TokenPayload
        const user = await User.findById(decodedToken._id)
        if (!user) {
            throw new ApiError(500,"user not found from token")
        }
    
        req.user = user  
    
        next();
    } catch (error: any) {
        throw new ApiError(401,error?.message,error)
    }
})