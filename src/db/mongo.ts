import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

const connectDb = async () => {
  await mongoose.connect(process.env.MONGOURL);
  console.log("MongoDB Server is up and running");
};

export default connectDb;
