import { connectToDB, getDatabase } from "./db/connection";

const database = getDatabase();

const generateFakeData = async () => {

  await database.dropDatabase();
  await database.saveFakeDatas();

  console.log('Data seeding completed');
};

const run = async () => {
    await connectToDB();
    await generateFakeData();
    await database.disconnect();
};

run().catch(err => {
    console.error('Error running seed script:', err);
});
