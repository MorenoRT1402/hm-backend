import { Model } from "mongoose";

export class CrudService<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
      return this.model.find().then(models => models);
    }

    async getByID(id: string): Promise<T | null> {
      return await this.model.findById(id); 
    }

    async getBy(props : {}): Promise<T | null>{
        return await this.model.findOne(props);
    }

    // Crear un nuevo elemento
    async create(itemInput: Partial<T>): Promise<T> {
        const newItem = new this.model(itemInput);
        await newItem.save();
        return newItem;
    }

    // Actualizar un elemento existente
    async update(id: string, updatedItem: Partial<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate({_id:id}, updatedItem, { new: true });
    }

    // Eliminar un elemento por ID
    async remove(id: string): Promise<boolean> {
        const result = await this.model.deleteOne({ _id:id });
        return result.deletedCount === 1;
    }
}
