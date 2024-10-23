import mongoose, { model, Model } from "mongoose";
import { configDotenv } from "dotenv";
import { IDatabase } from "./IDatabase";
import { UserModel } from "./schemas/userSchema";
import { RoomModel } from "./schemas/roomSchema";
import { ContactModel } from "./schemas/contactSchema";
import { BookingModel } from "./schemas/bookingSchema";
import { hardcodedUser } from "../app/hardcodedUser";
import { fakeUser } from "../data/fake/users";
import { fakeRoom } from "../data/fake/rooms";
import { fakeContact } from "../data/fake/contacts";
import { fakeBooking } from "../data/fake/bookings";
import { GENERATION_NUMBER } from "../app/testDB";

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

    async getAll<T>(model: Model<T>, populateFields?: string[]): Promise<T[]> {
        return model.find().populate(populateFields ? populateFields.join(' ') : []).exec();
    }

    async getByID<T>(model: Model<T>, id: string, populateFields?: string[]): Promise<T | null> {
        const query = model.findById(id);
        if (populateFields) {
            query.populate(populateFields.join(' '));
        }
        return query.exec();
    }

    async getBy<T>(model: Model<T>, props: {}): Promise<T | null> {
        return model.findOne(props).exec();
    }

    async create<T>(model: Model<T>, itemInput: Partial<T>): Promise<T> {
        const newItem = new model(itemInput);
        newItem.save();
        return newItem;
    }

    async update<T>(model: Model<T>, id: string, updatedItem: Partial<T>): Promise<T | null> {
        return model.findByIdAndUpdate(id, updatedItem, { new: true }).exec();
    }

    async remove<T>(model: Model<T>, id: string): Promise<boolean> {
        const result = await model.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async dropDatabase() {
        await UserModel.deleteMany({});
        await RoomModel.deleteMany({});
        await ContactModel.deleteMany({});
        await BookingModel.deleteMany({});
    }

    async saveFakeData<T>(fakeItem: () => Promise<T> | T, model: Model<T>){
        const fakeDatas = []
          for (let i = 0; i < GENERATION_NUMBER; i++) {
            try {
              const itemData = await fakeItem();
              const item = new model(itemData);
              fakeDatas.push(item);
            } catch (error) {
              console.error("Error saving items:", error);
            }
          }
          await model.insertMany(fakeDatas);
        };

    async saveFakeDatas() {
        const adminUser = new UserModel(hardcodedUser);
        await adminUser.save();
        await this.saveFakeData(fakeUser, UserModel);
        await this.saveFakeData(fakeRoom, RoomModel);
        await this.saveFakeData(fakeContact, ContactModel);
        await this.saveFakeData(fakeBooking, BookingModel);
    }

    getItemID (item:any): any { return item._id};
}
