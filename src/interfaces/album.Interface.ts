export default interface IAlbum {
  artist: string;
  cover: string;
  genre: string;
  year: number;
  numberOfSongs: number;
  tracks: [string];
}
