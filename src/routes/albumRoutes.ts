import { Router } from 'express';
import {
  isArtist,
  setArtist,
  isTrackArtist,
} from '../middlewares/artist.Middleware';
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
  .route('/:id')
  .get(getSingleAblum)
  .patch(isTrackArtist, updateAblum)
  .delete(isTrackArtist, deleteAblum);

export default router;
