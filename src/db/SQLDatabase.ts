import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";
import { IDatabase } from "./IDatabase";


console.log(process.env.SQL_HOST);

const host = process.env.SQL_HOST;
const user = process.env.SQL_USER;
const password = process.env.SQL_PASSWORD;
const dbName = process.env.DB_NAME;

export class SQLDatabase implements IDatabase {
  private connection: mysql.Connection | null = null;

  async connect(): Promise<void> {
    this.connection = await mysql.createConnection({
      host,
      user,
      password,
      database: dbName
    });
    console.log("MySQL connected");
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
    }
  }

  async find(table: string, query: any): Promise<any> {
    const [rows] = await this.connection!.query(`SELECT * FROM ${table} WHERE ?`, [query]);
    return rows;
  }

  async create(table: string, data: any): Promise<any> {
    const [result] = await this.connection!.query(`INSERT INTO ${table} SET ?`, data);
    return result;
  }

  async update(table: string, query: any, data: any): Promise<any> {
    await this.connection!.query(`UPDATE ${table} SET ? WHERE ?`, [data, query]);
  }

  async delete(table: string, query: any): Promise<any> {
    await this.connection!.query(`DELETE FROM ${table} WHERE ?`, [query]);
  }
}
