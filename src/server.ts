import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception!! Shutting Down');
  console.log({ name: err.name, message: err.message });
  process.exit(1);
});

// const DB = process.env.DATABASE_CLOUD;
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(`${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('DB Connection successful');
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

export default (opts: any = {}, cb?: () => void | undefined) => {
  const port = opts.port || 3000;
  return app.listen(port, '', 0, cb);
};
