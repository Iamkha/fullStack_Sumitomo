import mongoose from "mongoose";
import { initialDb } from "../utils/initial-db";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  const { connection } = mongoose;
  // connection.on("connected", () => {
  //   console.log("Mongo Connection Established");
  //   initialDb();
  // });

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(String(process.env.MONGO_URL), {
      dbName: process.env.DB_NAME,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export const connectionString = process.env.MONGO_URL;
