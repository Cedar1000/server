import { Request, Response, NextFunction, Router } from 'express';
import { signup } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello workd');
});

export default router;
