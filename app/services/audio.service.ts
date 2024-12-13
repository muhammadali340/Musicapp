import { Observable } from '@nativescript/core';
import { TNSPlayer } from '@nativescript/audio';
import { Song } from '../models/song.model';

export class AudioService extends Observable {
  private player: TNSPlayer;
  private _currentSong: Song | null = null;
  private _isPlaying = false;
  private _currentTime = 0;
  private _playlist: Song[] = [];

  constructor() {
    super();
    this.player = new TNSPlayer();
    this.player.debug = true;
    
    // Setup audio player events
    this.player.on('timeUpdate', (args: any) => {
      this._currentTime = args.currentTime;
      this.notifyPropertyChange('currentTime', this._currentTime);
    });
  }

  async initializePlayer(audioPath: string) {
    try {
      await this.player.init({
        audioFile: audioPath,
        loop: false,
        completeCallback: () => this.onTrackComplete(),
        errorCallback: (error) => console.error('Audio error:', error)
      });
    } catch (err) {
      console.error('Error initializing player:', err);
    }
  }

  async playPause() {
    if (this._isPlaying) {
      await this.player.pause();
    } else {
      await this.player.play();
    }
    this._isPlaying = !this._isPlaying;
    this.notifyPropertyChange('isPlaying', this._isPlaying);
  }

  async seekTo(time: number) {
    await this.player.seekTo(time);
  }

  async setVolume(volume: number) {
    await this.player.setVolume(volume);
  }

  private onTrackComplete() {
    this.playNext();
  }

  async playNext() {
    const currentIndex = this._playlist.findIndex(song => song.id === this._currentSong?.id);
    if (currentIndex < this._playlist.length - 1) {
      await this.playSong(this._playlist[currentIndex + 1]);
    }
  }

  async playPrevious() {
    const currentIndex = this._playlist.findIndex(song => song.id === this._currentSong?.id);
    if (currentIndex > 0) {
      await this.playSong(this._playlist[currentIndex - 1]);
    }
  }

  async playSong(song: Song) {
    this._currentSong = song;
    await this.initializePlayer(song.path);
    await this.player.play();
    this._isPlaying = true;
    this.notifyPropertyChange('currentSong', this._currentSong);
    this.notifyPropertyChange('isPlaying', this._isPlaying);
  }

  get currentSong(): Song | null {
    return this._currentSong;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  get currentTime(): number {
    return this._currentTime;
  }

  get playlist(): Song[] {
    return this._playlist;
  }

  set playlist(songs: Song[]) {
    this._playlist = songs;
    this.notifyPropertyChange('playlist', this._playlist);
  }
}