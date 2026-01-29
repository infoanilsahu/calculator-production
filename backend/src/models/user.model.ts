import mongoose, { HydratedDocument, Types } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt, {SignOptions} from 'jsonwebtoken';
import crypto from "crypto"

export interface IUser {
    email: string;
    password: string;
    username: string;
    historyId: Types.ObjectId[];
    isEmailVerified: boolean;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateRefreashToken(): Promise<string>;
    generateAccessToken(): Promise<string>;
    generateTemporaryToken(): {
        unhashedToken: string;
        hashedToken: string;
        tokenExpiery: number;
    };

    refreashtoken?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    historyId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "History"
    }]
},{timestamps: true})

userSchema.pre("save", async function (this: HydratedDocument<IUser>) {
    if(!this.isModified("password")) return ;
    this.password = await bcryptjs.hash(this.password,10);   
})

userSchema.methods.isPasswordCorrect = async function (this: HydratedDocument<IUser>,password: string) {
    return await bcryptjs.compare(password,this.password);    
}

userSchema.methods.generateRefreashToken = async function (this: HydratedDocument<IUser>): Promise<string> {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIERY as jwt.SignOptions["expiresIn"]})
}


userSchema.methods.generateAccessToken = async function (this: HydratedDocument<IUser>): Promise<string> {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIERY as jwt.SignOptions["expiresIn"]})
}

userSchema.methods.generateTemporaryToken = async function () {
    const unhashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex")

    const tokenExpiery = Date.now() + (20*60*1000);

    return {unhashedToken,hashedToken,tokenExpiery};
}

export type UserDocument = HydratedDocument<IUser>;
export const User = mongoose.model<IUser>("User",userSchema)