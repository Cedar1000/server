import { Router } from 'express';
import { authorizeUser } from '../middlewares/track.Middleware';

import {
  createAlbum,
  updateAblum,
  deleteAblum,
  getAllAblums,
  getSingleAblum,
} from '../controllers/albumController';

const router = Router();

router.route('/album').post(authorizeUser, createAlbum).get(getAllAblums);

router
  .route('/album/:id')
  .get(getSingleAblum)
  .patch(updateAblum)
  .delete(deleteAblum);

export default router;
