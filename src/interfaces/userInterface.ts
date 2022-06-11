import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  avatar: string;
  gender: string;
  password: string;
  passwordConfirm: string | undefined;
  dob: string;
  passwordResetTokenExpires: Date;
  passwordChangedAt: Date;
  passwordResetToken: string;
}
