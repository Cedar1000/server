import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import googleapis from 'googleapis';

import { Request, Response, NextFunction } from 'express';
import { DocumentDefinition } from 'mongoose';
import User from '../models/userModel';
import catchAsync from '../uitils/catchAsync';
import userInterface from '../interfaces/userInterface';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    const { name, email, gender, password, passwordConfirm } = req.body;
    const userData = {
      name,
      email,
      gender,
      password,
      passwordConfirm,
    };

    const newUser = await User.create(userData);
    createAndSendToken(newUser, 201, res);
  }
);

// handles google Authentication
export const googleAuthentication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //Get token from request body
    const { idToken } = req.body;

    //veriffy token againt google's api
    const response = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const {
      payload: { name, email, picture: avatar },
    }: any = { ...response };

    //Check if user already exists in DB
    const user = await User.findOne({ email });

    //If user exists login, else register
    if (user) {
      return res.status(200).json({ status: 'success', token: idToken, user });
    } else {
      const newUser = await User.collection.insertOne({
        name,
        email,
        avatar,
        active: true,
      });

      res.status(201).json({ status: 'success', token: idToken, newUser });
    }
  }
);
