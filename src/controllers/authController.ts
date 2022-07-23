import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { promisify } from 'util';

import { Request, Response, NextFunction } from 'express';
import { DocumentDefinition } from 'mongoose';
import User from '../models/userModel';
import catchAsync from '../uitils/catchAsync';
import AppError from '../uitils/appError';
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

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //1) check if email or password was passed in
    if (!email || !password) {
      return next(new AppError('Please Provide email and password!', 400));
    }

    //2) Check if  user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const err = new AppError('No User with that email', 404);

      return next(err);
    }

    //Check if inputed password is correct
    const correct = await user.schema.methods.correctPassword(
      password,
      user.password
    );

    if (!correct) {
      return next(new AppError('Incorrect email or password', 401));
    }

    //3) If everything is ok, send token to client
    createAndSendToken(user, 200, res);
  }
);

//Restrict routes to only logged in users
// exports.protect = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
//   //1) Getting token and check if its there

//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   //2) Validate token
//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please login to get access', 401)
//     );
//   }

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   //3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError('The user belonging to the token no longer exists.', 401)
//     );
//   }

//   //4) Check if user changed password after jwt was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password! Please login  again', 401)
//     );
//   }

//   // GRANT ACCESS TO ROUTE
//   //@ts-ignore
//   req.user = currentUser;

//   next();
// });

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
