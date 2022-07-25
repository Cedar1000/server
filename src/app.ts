import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import AppError from './uitils/appError';
import globalErrorHandler from './controllers/errorController';

//Start express app
const app = express();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//ROUTERS
import userRouter from './routes/userRoutes';
import trackRouter from './routes/trackRoutes';
import albumRouter from './routes/albumRoutes';

//Body parser
app.use(cors());
app.use(express.json({ limit: '10kb' }));

//ROUTES
app.get('/', (req, res) => res.send('Welcome'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tracks', trackRouter);
app.use('/api/v1/album', albumRouter);

app.all('*', (req, res, next) => {
  console.log('no routes matched');
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  // The next function accepts an argument that we use as the error object
  next(err);
});

// Global Error Handling Middleware for Operational error

app.use(globalErrorHandler);

export default app;
