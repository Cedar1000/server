import { NextFunction, Request, Response } from 'express';

type asyncFunc = (req: Request, res: Response, next: NextFunction) => any;

export default (fn: asyncFunc) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
