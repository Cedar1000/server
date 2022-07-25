import Ablum from '../models/albumModel';
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from './handlerFactory';

export const createAlbum = createOne(Ablum);
export const getAllAblums = getAll(Ablum);
export const getSingleAblum = getOne(Ablum);
export const updateAblum = updateOne(Ablum);
export const deleteAblum = deleteOne(Ablum);
