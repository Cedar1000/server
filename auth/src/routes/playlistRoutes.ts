import { Router } from 'express';
import { setUser } from '../middlewares/playlist.Middeware';
import { protect } from '../controllers/authController';

import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getAllPlaylists,
  getSinglePlaylist,
} from '../controllers/playlistController';

const router = Router();

router.route('/').post(protect, setUser, createPlaylist).get(getAllPlaylists);

router
  .route('/:id')
  .get(getSinglePlaylist)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

export default router;
