import { Request, Response, NextFunction } from 'express';
import { DocumentDefinition } from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import catchAsync from '../uitils/catchAsync';
import userInterface from '../interfaces/userInterface';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (
  user: DocumentDefinition<userInterface>,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id);

  //Remove password from output
  user.password = '';
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;
    const userData = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };

    const newUser = await User.create(userData);
    createAndSendToken(newUser, 201, res);
  }
);
