import { Request, Response, NextFunction, Router } from 'express';
import {
  signup,
  googleAuthentication,
  protect,
  login,
} from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protect', protect);

router.post('/google-sign-in', googleAuthentication);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello world');
});

export default router;
