import { Schema, model } from 'mongoose';
import IPlaylist from '../interfaces/playlist.Interface';

const playlistSchema = new Schema<IPlaylist>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  title: {
    type: String,
    required: [true, 'A track must have a title'],
  },

  tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
});

export default model('Playlist', playlistSchema);
