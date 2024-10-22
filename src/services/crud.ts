import { Model } from "mongoose";
import { IDatabase } from "../db/IDatabase";
import { getDatabase } from "../db/connection";

export class CrudService<T> {
    private model: Model<T>;
    private database: IDatabase;

    constructor(model: Model<T>) {
        this.model = model;
        this.database = getDatabase();
    }

    async getAll(populateFields: string[]=[]): Promise<T[]> {
        return await this.database.getAll(this.model, populateFields);
    }

    async getByID(id: string, populateFields: string[]=[]): Promise<T | null> {
        return await this.database.getByID(this.model, id, populateFields);
    }

    async getBy(props : {}): Promise<T | null>{
        return await this.database.getBy(this.model, props);
    }

    // Create a new item
    async create(itemInput: Partial<T>): Promise<T> {
        return await this.database.create(this.model, itemInput);
    }

    // Update an existing item
    async update(id: string, updatedItem: Partial<T>): Promise<T | null> {
        return await this.database.update(this.model, id, updatedItem);
    }

    // Delete an item by ID
    async remove(id: string): Promise<boolean> {
        return await this.database.remove(this.model, id);
    }
}
