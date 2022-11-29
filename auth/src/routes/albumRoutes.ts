import { Router } from 'express';
import {
  isArtist,
  setArtist,
  isAlbumOwner,
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
  .patch(isAlbumOwner, updateAblum)
  .delete(isAlbumOwner, deleteAblum);

export default router;
