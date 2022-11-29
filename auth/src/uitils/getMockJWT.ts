import User from '../models/userModel';
import { DocumentDefinition } from 'mongoose';
import userInterface from '../interfaces/user.Interface';
import { signToken } from '../controllers/authController';

const getJwt: Function = async () => {
  const user: DocumentDefinition<userInterface> | any = await User.findOne({
    email: 'ced@ced.com',
  });

  const token = signToken(user._id);

  return { token, userId: user._id };
};

export default getJwt;
