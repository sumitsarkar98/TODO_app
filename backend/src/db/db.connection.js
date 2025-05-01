import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI} /${DB_NAME}`);
    console.log("MongoDB is connected successfully!!");
  } catch (err) {
    console.error("SORRY, MongoDB not connected!!", err);
    process.exit(1);
  }
};

export default connectDB;
