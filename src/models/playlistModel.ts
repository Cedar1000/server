import { Schema, model } from 'mongoose';
import IPlaylist from '../interfaces/playlist.Interface';

const playlistSchema = new Schema<IPlaylist>({
  title: {
    type: String,
    required: [true, 'A track must have a title'],
  },

  tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
});

export default model('Track', playlistSchema);
