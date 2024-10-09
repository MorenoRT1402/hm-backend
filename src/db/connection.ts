// db/connection.ts
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${username}:${password}@cluster0.h2xrt.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};
