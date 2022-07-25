import { Router } from 'express';

import {
  createAlbum,
  updateAblum,
  deleteAblum,
  getAllAblums,
  getSingleAblum,
} from '../controllers/albumController';

const router = Router();

router.route('/album').post(createAlbum).get(getAllAblums);

router
  .route('/Album/:id')
  .get(getSingleAblum)
  .patch(updateAblum)
  .delete(deleteAblum);

export default router;
