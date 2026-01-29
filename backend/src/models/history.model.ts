import mongoose, { Schema, Types } from "mongoose";

interface IHistory {
    path: string;
    input: {};
    answer: number;
    userId: Types.ObjectId;
}

const historySchema = new mongoose.Schema<IHistory>({
    path: {
        type: String,
        required: true,
    },
    input: {
        type: {},
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true})


export const History = mongoose.model("History",historySchema)