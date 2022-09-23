import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';
import { users as usersArray } from './payloads/user.payloads';
import { tracks } from './payloads/track.payloads';
import User from '../models/userModel';
import Track from '../models/trackModel';

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);

  const users = await User.insertMany(usersArray);

  tracks.forEach(async (track) => {
    //Get random user index from user array
    const randomUserIndex = Math.floor(Math.random() * users.length);

    //Get user with that index and extract the ID
    const artist = users[randomUserIndex]._id;

    //Create trak with user as artist
    await Track.create({ ...track, artist });
  });
});

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
