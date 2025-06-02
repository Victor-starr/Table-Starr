import mongoose from "mongoose";

const DB_URL = process.env.DB as string;
console.log(DB_URL);
if (!DB_URL) {
  throw new Error("Database URL is not defined in environment variables.");
}
let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(DB_URL, {
      dbName: "table-starr",
    });
    isConnected = true;
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
