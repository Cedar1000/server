import { NextFunction, Request, Response } from 'express';

interface requestResponse {
  (req: Request, res: Response, next?: NextFunction): Promise<Response>;
}

export default requestResponse;
