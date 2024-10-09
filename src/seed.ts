import mongoose from "mongoose";
import { RoomModel } from "./db/schemas/roomSchema";
import { GENERATION_NUMBER } from "./app/testDB";
import { fakeRoom } from "./data/fake/rooms";
import { connectToDB } from "./db/connection";

const clearCollections = async() => {
    await RoomModel.deleteMany({});
}

const saveFakeDatas = async() => {
    for (let i = 0; i < GENERATION_NUMBER; i++) {
        const room = new RoomModel(fakeRoom());
        await room.save();
    }
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
