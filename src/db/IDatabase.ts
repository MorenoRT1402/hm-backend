import { Model } from "mongoose";

export interface IDatabase {  
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  getAll<T>(table :Model<T>, populateFields?: string[]): Promise<T[]>;
  getByID<T>(table :Model<T>, id: string, populateFields?: string[]): Promise<T | null>;
  getBy<T>(table :Model<T>, props: {}): Promise<T | null>;
  create<T>(table :Model<T>, itemInput: Partial<T>): Promise<T>;
  update<T>(table :Model<T>, id: string, updatedItem: Partial<T>): Promise<T | null>;
  remove<T>(table :Model<T>, id: string): Promise<boolean>;

  dropDatabase(): Promise<void>;
  saveFakeDatas(): Promise<void>;
}
  