import mongoose from "mongoose";

export const connectMondodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to mongodb');
    } catch (error) {
        console.log('Error connecing to mongodb', error);
    }
}