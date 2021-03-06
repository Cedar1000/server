import { Request, Response, NextFunction } from 'express';

import catchAsync from '../uitils/catchAsync';
import AppError from '../uitils/appError';

export const authorizeUser = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    //check if logged in user is an artist
    //@ts-ignore
    if (req.user.type !== 'artist') {
      return new AppError('This action is valid for only artists', 403);
    }

    //If logged in user is an artist, set their id on the track
    //@ts-ignore
    req.body.artist = req.user.id;

    next();
  }
);
