import { Request, Response, NextFunction } from 'express';
import ErrorInterface from '../interfaces/appError.Interface';

import AppError from '../uitils/appError';

//Error For Development Mode
const sendErrorDev = (err: ErrorInterface, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//Error For Production Mode
const sendErrorProd = (err: ErrorInterface, res: Response) => {
  // Operational, trusted error: send message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknown error: don't want leak details to the client
  } else {
    //1) Log error
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

//CAST ERROR
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

//DUPPLICATE FIELD ERROR
const handleDuplicateFieldsDB = (err: any) => {
  const value = Object.keys(err.keyValue)[0];
  const message = `Duplicate Field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

//VALIDATION ERROR
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

//JWT ERROR
const handleJWTError = () => new AppError('Please login again!', 401);

const handleJWTExpiredError = (err: any) =>
  new AppError(
    `Token Expired. Date Expired: ${err.expiredAt}. Please Login Again`,
    401
  );

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  if (process.env.NODE_ENV?.trim() === 'development') {
    return sendErrorDev(err, res);
  } else if (process.env.NODE_ENV?.trim() === 'production') {
    let error = { ...err, message: err.message };
    if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiresError')
      error = handleJWTExpiredError(error);

    return sendErrorProd(error, res);
  }
};
