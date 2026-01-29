import { User } from "../../models/user.model.js"
import { ApiError } from "../../utils/ApiError.js";

export const generateToken = async (userId:string) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404,"user id not found for generate token")
        }
    
        const refreshToken = await user.generateRefreashToken()
        const accessToken = await user.generateAccessToken()
        
        user.refreashtoken = refreshToken
        await user.save({validateBeforeSave: false})
        return {refreshToken, accessToken};
    } catch (error) {
        throw new ApiError(500,"something went wrong to generating token")
    }
}




