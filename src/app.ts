import express from 'express';
import morgan from 'morgan';

//Start express app
const app = express();

import userRouter from './routes/userRoutes';

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser
app.use(express.json({ limit: '10kb' }));

//ROUTES
app.use('/api/v1/users', userRouter);

export default app;
