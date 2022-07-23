import { Schema, model, Model } from 'mongoose';
import IAlbum from '../interfaces/album.Interface';

const albumSchema = new Schema<IAlbum>({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An album must have an artist'],
  },

  cover: {
    type: String,
    required: [true, 'An album must have a cover'],
  },

  genre: {
    type: String,
    enum: ['Pop', 'R&B', 'Rap', 'Blues'],
    required: [true, 'A track must have a genre'],
  },

  year: {
    type: Number,
    required: [true, 'An album must have a year'],
  },

  numberOfSongs: {
    type: Number,
    required: [true, 'An album must have a year'],
  },

  tracks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Track',
    },
  ],
});

export default model('Album', albumSchema);
