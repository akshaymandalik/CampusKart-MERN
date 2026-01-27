import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "../config/.env" });


export const connectDB = async () => {
  
  const uri = process.env.MONGOSTR;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected using Mongoose");
    // Connection is established. Mongoose models can now be used.
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
}

