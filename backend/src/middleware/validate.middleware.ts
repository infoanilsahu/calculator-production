import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = async (req:Request,res: Response,next: NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const extractError: any = [];
    errors.array().map( (data: any) => extractError.push({
        [data.type]: data.msg
    }))
    throw new ApiError(422,"Recive error on validation",extractError)
}