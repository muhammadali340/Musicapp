export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  path: string;
  albumArt?: string;
}