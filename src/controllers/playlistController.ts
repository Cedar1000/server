import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from './handlerFactory';

import Playlist from '../models/playlistModel';

export const createPlaylist = createOne(Playlist);
export const getAllPlaylists = getAll(Playlist);
export const getSinglePlaylist = getOne(Playlist);
export const updatePlaylist = updateOne(Playlist);
export const deletePlaylist = deleteOne(Playlist);
