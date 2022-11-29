import { Request, Response, NextFunction } from 'express';

import catchAsync from '../uitils/catchAsync';

export const setUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //Check if request is to get a particular user's playlists
    //Or Create one for a user
    if (req.query.create) {
      //@ts-ignore
      req.body.user = req.user.id;
    } else {
      //@ts-ignore
      req.filterOptions = { user: req.user.id };
    }
    next();
  }
);
