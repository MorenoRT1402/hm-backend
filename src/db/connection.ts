import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { IDatabase } from "./IDatabase";
import { DatabaseFactory } from "./DatabaseFactory";

configDotenv();

const dbType = process.env.DB_TYPE || "mongo";
const database: IDatabase = DatabaseFactory.createDatabase(dbType);

export const connectToDB = async () => {
    try {
        await database.connect();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};
