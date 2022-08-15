import { Router } from 'express';
import { authorizeUser, testMiddleware } from '../middlewares/track.Middleware';
import { protect } from '../controllers/authController';

import {
  createTrack,
  updateTrack,
  deleteTrack,
  getAllTracks,
  getSingleTrack,
} from '../controllers/trackController';

const router = Router();

router
  .route('/')
  .post(protect, authorizeUser, createTrack)
  .get(protect, getAllTracks);

router.route('/test').get(testMiddleware);

router.route('/:id').get(getSingleTrack).patch(updateTrack).delete(deleteTrack);

export default router;
