import Track from '../models/trackModel';
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from './handlerFactory';

export const createTrack = createOne(Track);
export const getAllTracks = getAll(Track);
export const getSingleTrack = getOne(Track);
export const updateTrack = updateOne(Track);
export const deleteTrack = deleteOne(Track);
