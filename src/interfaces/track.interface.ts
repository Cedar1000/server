export default interface ITrack {
  cover: string;
  artist: string;
  title: string;
  url: string;
  duration: string;
  genre: string;
  features?: [string];
}
