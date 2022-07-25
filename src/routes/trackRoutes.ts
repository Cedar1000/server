import { Router } from 'express';
import { authorizeUser } from '../middlewares/track.Middleware';

import {
  createTrack,
  updateTrack,
  deleteTrack,
  getAllTracks,
  getSingleTrack,
} from '../controllers/trackController';

const router = Router();

router.route('/track').post(authorizeUser, createTrack).get(getAllTracks);

router
  .route('/track/:id')
  .get(getSingleTrack)
  .patch(updateTrack)
  .delete(deleteTrack);

export default router;
