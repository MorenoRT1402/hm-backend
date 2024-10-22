import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { IDatabase } from "./IDatabase";

configDotenv();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${username}:${password}@cluster0.h2xrt.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export class MongoDatabase implements IDatabase {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(connectionString);
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  async find(collection: string, query: any): Promise<any> {
    return mongoose.model(collection).find(query);
  }

  async create(collection: string, data: any): Promise<any> {
    return mongoose.model(collection).create(data);
  }

  async update(collection: string, query: any, data: any): Promise<any> {
    return mongoose.model(collection).updateOne(query, data);
  }

  async delete(collection: string, query: any): Promise<any> {
    return mongoose.model(collection).deleteOne(query);
  }
}
