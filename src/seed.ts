import mongoose, { Model } from "mongoose";
import { RoomModel } from "./db/schemas/roomSchema";
import { GENERATION_NUMBER } from "./app/testDB";
import { fakeRoom } from "./data/fake/rooms";
import { connectToDB } from "./db/connection";
import { ContactModel } from "./db/schemas/contactSchema";
import { fakeContact } from "./data/fake/contacts";

const clearCollections = async() => {
    await RoomModel.deleteMany({});
    await ContactModel.deleteMany({});
}

const saveFakeData = async <T>(fakeItem:()=>{}, model:Model<T>) => {
    for (let i = 0; i < GENERATION_NUMBER; i++) {
        const item = new model(fakeItem());
        await item.save();
    }}

const saveFakeDatas = async() => {
    await saveFakeData(fakeRoom, RoomModel);
    await saveFakeData(fakeContact, ContactModel);
}

const generateFakeData = async () => {

    await clearCollections();
    await saveFakeDatas();

    console.log('Data seeding completed');
};

const run = async () => {
    await connectToDB();
    await generateFakeData();
    mongoose.connection.close();
};

run().catch(err => {
    console.error('Error running seed script:', err);
});
