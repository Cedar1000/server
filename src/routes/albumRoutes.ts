import { Router } from 'express';
import { isArtist, isTrackArtist } from '../middlewares/track.Middleware';
import { setArtist } from '../middlewares/album.Middleware';
import { protect } from '../controllers/authController';

import {
  createAlbum,
  updateAblum,
  deleteAblum,
  getAllAblums,
  getSingleAblum,
} from '../controllers/albumController';

const router = Router();

router.use(protect);

router.route('/').post(isArtist, setArtist, createAlbum).get(getAllAblums);

router
  .route('/album/:id')
  .get(getSingleAblum)
  .patch(isTrackArtist, updateAblum)
  .delete(isTrackArtist, deleteAblum);

export default router;
