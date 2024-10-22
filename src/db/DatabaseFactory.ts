import { IDatabase } from "./IDatabase";
import { MongoDatabase } from "./MongoDatabase";
import { SqlDatabase } from "./SQLDatabase";

export class DatabaseFactory {
  static createDatabase(type: string): IDatabase {
    if (type === "mongo") {
      return new MongoDatabase();
    } else if (type === "sql") {
      return new SqlDatabase();
    } else {
      throw new Error("Unsupported database type");
    }
  }
}
