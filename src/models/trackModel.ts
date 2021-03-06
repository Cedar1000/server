import { Schema, model } from 'mongoose';
import Itrack from '../interfaces/track.Interface';

const trackSchema = new Schema<Itrack>({
  cover: {
    type: String,
    required: [true, 'A track must have a schema'],
  },

  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A track must have an artist'],
  },

  title: {
    type: String,
    required: [true, 'A track must have a title'],
  },

  url: {
    type: String,
    required: [true, 'A track must have a url'],
  },

  genre: {
    type: String,
    enum: ['Pop', 'R&B', 'Rap', 'Blues'],
    required: [true, 'A track must have a genre'],
  },

  duration: {
    type: String,
    required: [true, 'A track must have a duration'],
  },

  features: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Track', trackSchema);
