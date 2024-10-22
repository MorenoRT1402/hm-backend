import { configDotenv } from "dotenv";
import { DatabaseFactory } from "./DatabaseFactory";

configDotenv();

const dbType = process.env.DB_TYPE || "mongo";
export const getDatabase = () => DatabaseFactory.createDatabase(dbType);
const database = getDatabase();

export const connectToDB = async () => {
    try {
        await database.connect();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};
