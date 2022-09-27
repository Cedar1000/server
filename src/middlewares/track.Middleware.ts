import { Request, Response, NextFunction } from 'express';

import Track from '../models/trackModel';
import catchAsync from '../uitils/catchAsync';
import AppError from '../uitils/appError';

export const isArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //check if logged in user is an artist

    //@ts-ignore
    if (req.user.type !== 'artist') {
      return next(new AppError('This action is valid for only artists', 403));
    }

    //If logged in user is an artist, set their id on the track
    //@ts-ignore
    req.body.artist = req.user.id;

    next();
  }
);

export const isTrackArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const track = await Track.findById(req.params.id);

    //@ts-ignore
    if (req.user.id !== track.artist.id) {
      return next(new AppError('You are unable to perform this action!', 403));
    }

    next();
  }
);
