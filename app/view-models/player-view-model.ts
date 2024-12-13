import { Observable } from '@nativescript/core';
import { AudioService } from '../services/audio.service';
import { Song } from '../models/song.model';

export class PlayerViewModel extends Observable {
  private audioService: AudioService;

  constructor() {
    super();
    this.audioService = new AudioService();
  }

  get currentSong(): Song | null {
    return this.audioService.currentSong;
  }

  get isPlaying(): boolean {
    return this.audioService.isPlaying;
  }

  get currentTime(): number {
    return this.audioService.currentTime;
  }

  get playlist(): Song[] {
    return this.audioService.playlist;
  }

  async playPause() {
    await this.audioService.playPause();
  }

  async next() {
    await this.audioService.playNext();
  }

  async previous() {
    await this.audioService.playPrevious();
  }

  async seekTo(time: number) {
    await this.audioService.seekTo(time);
  }

  async setVolume(volume: number) {
    await this.audioService.setVolume(volume);
  }

  async playSong(song: Song) {
    await this.audioService.playSong(song);
  }
}