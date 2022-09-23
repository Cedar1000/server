import User from '../models/userModel';
import { DocumentDefinition } from 'mongoose';
import userInterface from '../interfaces/user.Interface';
import { signToken } from '../controllers/authController';

const getJwt: Function = async () => {
  const user: DocumentDefinition<userInterface> | any = await User.findOne({
    email: 'ced@ced.com',
  });

  const jwt = signToken(user._id);

  return jwt;
};

export default getJwt;
