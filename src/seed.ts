import mongoose, { Model } from "mongoose";
import { RoomModel } from "./db/schemas/roomSchema";
import { GENERATION_NUMBER } from "./app/testDB";
import { fakeRoom } from "./data/fake/rooms";
import { connectToDB } from "./db/connection";
import { ContactModel } from "./db/schemas/contactSchema";
import { fakeContact } from "./data/fake/contacts";
import { fakeBooking } from "./data/fake/bookings";
import { BookingModel } from "./db/schemas/bookingSchema";
import { UserModel } from "./db/schemas/userSchema";
import { hardcodedUser } from "./app/hardcodedUser";
import { fakeUser } from "./data/fake/users";

const clearCollections = async() => {
  await UserModel.deleteMany({});
  await RoomModel.deleteMany({});
  await ContactModel.deleteMany({});
  await BookingModel.deleteMany({});
}

const saveFakeData = async <T>(fakeItem: () => Promise<T> | T, model: Model<T>) => {
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
  
  

const saveFakeDatas = async() => {
  const adminUser = new UserModel(hardcodedUser);
  await adminUser.save();
  await saveFakeData(fakeUser, UserModel);
  await saveFakeData(fakeRoom, RoomModel);
  await saveFakeData(fakeContact, ContactModel);
  await saveFakeData(fakeBooking, BookingModel);
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
