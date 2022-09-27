import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import express from 'express';
import { users as usersArray } from './payloads/user.payloads';
import { tracks } from './payloads/track.payloads';
import getJwt from '../uitils/getMockJWT';

//ROUTERS
import albumRouter from '../routes/albumRoutes';
import trackRouter from '../routes/trackRoutes';
import playlistRouter from '../routes/playlistRoutes';
import userRouter from '../routes/userRoutes';

import User from '../models/userModel';
import Track from '../models/trackModel';

const app = express();

app.use(express.json());

//ROUTES
app.use('/api/v1/album', albumRouter);
app.use('/api/v1/tracks', trackRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/playlist', playlistRouter);

let mongo: any;
export let jwt: string;
export let userID: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);

  let users: any = usersArray.map(async (user) => await User.create(user));

  users = await Promise.all(users);

  const { token, userId } = await getJwt();
  jwt = token;
  userID = userId;

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

export default app;
