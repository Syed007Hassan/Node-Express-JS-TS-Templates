import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

const connectDb = async () => {
  const connection = process.env.MONGOURL as string;
  await mongoose.connect(connection);
  console.log("MongoDB Server is up and running");
};

const mongooseDisconnect = async () => {
  await mongoose.disconnect();
};

export { connectDb, mongooseDisconnect };
