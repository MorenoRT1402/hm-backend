import { Model } from "mongoose";

export class CrudService<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(populateFields: string[]=[]): Promise<T[]> {
        return this.model.find().populate(populateFields.join(' ')).then((models: T[]) => models);
    }

    async getByID(id: string, populateFields: string[]=[]): Promise<T | null> {
        return await this.model.findById(id).populate(populateFields.join(' '));
    }

    async getBy(props : {}): Promise<T | null>{
        return await this.model.findOne(props);
    }

    // Create a new item
    async create(itemInput: Partial<T>): Promise<T> {
        const newItem = new this.model(itemInput);
        await newItem.save();
        return newItem;
    }

    // Update an existing item
    async update(id: string, updatedItem: Partial<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate(
            { _id: id }, 
            updatedItem, 
            { 
                new: true, 
                runValidators: true, 
                optimisticConcurrency: true //__v ++
            }
        );
    }

    // Delete an item by ID
    async remove(id: string): Promise<boolean> {
        const result = await this.model.deleteOne({ _id:id });
        return result.deletedCount === 1;
    }
}
