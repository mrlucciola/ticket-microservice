import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// Delete info from all collections before each test
beforeEach(async () => {
  const colls = await mongoose.connection.db.collections();

  for (const coll of colls) {
    await coll.deleteMany({});
  }
});

// Stop mongo memory server
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
