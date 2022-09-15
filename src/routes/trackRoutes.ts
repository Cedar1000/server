import { Router } from 'express';
import { isArtist, isTrackArtist } from '../middlewares/track.Middleware';
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
  .post(protect, isArtist, createTrack)
  .get(protect, getAllTracks);

router
  .route('/:id')
  .get(getSingleTrack)
  .patch(isTrackArtist, updateTrack)
  .delete(isTrackArtist, deleteTrack);

export default router;
