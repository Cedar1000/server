import { Router } from 'express';
import { isArtist, isTrackArtist } from '../middlewares/artist.Middleware';
import { protect } from '../controllers/authController';

import {
  createTrack,
  updateTrack,
  deleteTrack,
  getAllTracks,
  getSingleTrack,
} from '../controllers/trackController';

const router = Router();

router.use(protect);

router.route('/').post(isArtist, createTrack).get(getAllTracks);

router
  .route('/:id')
  .get(getSingleTrack)
  .patch(isTrackArtist, updateTrack)
  .delete(isTrackArtist, deleteTrack);

export default router;
