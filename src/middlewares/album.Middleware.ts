import { Request, Response, NextFunction } from 'express';

import catchAsync from '../uitils/catchAsync';

export const setArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //Set logged in artist id on request body

    //@ts-ignore
    req.body.artist = req.user.id;

    next();
  }
);
