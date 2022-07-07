import { Request, Response, NextFunction, Router } from 'express';
import { signup, googleSignIn } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);

router.post('/google-sign-in', googleSignIn);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello world');
});

export default router;
