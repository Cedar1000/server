import { Request, Response, NextFunction } from 'express';

import catchAsync from '../uitils/catchAsync';

export const setArtist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('stuff happening ');
    //Set logged in artist id on request body

    //@ts-ignore
    req.body.artist = req.user.id;

    //@ts-ignore
    console.log(req.user.id);

    next();
  }
);
