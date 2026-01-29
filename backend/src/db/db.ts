import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/calculator`)
         
    } catch (error: any) {
        console.log("MongoDB connection error : ",error);
        process.exit(1);
    }
}


export default connectDB;