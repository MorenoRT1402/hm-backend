import { Model } from "mongoose";
import { SQLTableInterface, tables } from "./sqlTables.data";

export const getTableName = (model:Model<any>) => tables.find(table => table.model === model)?.tableName;