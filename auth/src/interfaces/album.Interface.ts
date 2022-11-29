export default interface IAlbum {
  name: string;
  artist: string;
  cover: string;
  genre: string;
  year: number;
  numberOfSongs: number;
  tracks: [string];
}
