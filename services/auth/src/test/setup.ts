import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "test_key";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

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
