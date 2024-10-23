import { Model } from "mongoose";
import { SQLTableInterface } from "./sqlTables.data";

export const getTableName = (tables:SQLTableInterface[], model:Model<any>) => tables.find(table => table.model === model)?.tableName;