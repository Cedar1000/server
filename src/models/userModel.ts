import { Schema, model, Model } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import tokenEncrypt from '../uitils/tokenEncrypt';
import IUser from '../interfaces/userInterface';

interface IUserMethods {
  correctPassword(p1: string, p2: string): Promise<Boolean>;
  changedPasswordAfter(jwt: any): Boolean;
  createPasswordResetToken(): any;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: [true, 'A user must have a name'] },

  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'Email provided must be a valid email'],
  },

  avatar: { type: String, default: 'avatar' },

  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'A user must have a gender'],
  },

  password: {
    type: String,
    required: [true, 'User Must Provide Password'],
    minlength: [8, 'Password must be 8 or more characters'],
  },

  passwordResetTokenExpires: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
});

// Document Middleware
userSchema.pre('save', async function (next) {
  // 1) Hash Password
  if (this.isNew === true) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (this.isDirectModified('password') === false || this.isNew) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// Instance Methods -> This method is available on every document created with this model
userSchema.methods.correctPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // This checks if the password was changed after the token has been signed and sent
  if (this.passwordChangedAt) {
    // Convert the pasword changed time to timestamp
    // The Reason why we divide by 1000 is because the changedTimestamp is in milliseconds while
    // the JWTTimestamp is in seconds so we need to make sure they're both in the same format
    const changedTimestamp =
      parseInt(this.passwordChangedAt.getTime(), 10) / 1000;
    return JWTTimestamp < changedTimestamp;
  }
  // False means the password has not been changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = tokenEncrypt(resetToken);

  // Set the password reset token to expire in 10 minutes
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default model('User', userSchema);
