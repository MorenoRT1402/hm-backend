import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${username}:${password}@cluster0.h2xrt.mongodb.net/${dbName}`;

export default mongoose.connect(connectionString).then(() =>
    console.log("Database connected")
).catch(err => console.error(err));
