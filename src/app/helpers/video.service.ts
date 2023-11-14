import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }
  private currentVideoSubject = new BehaviorSubject<any>(null);
  currentVideo$ = this.currentVideoSubject.asObservable();

  setCurrentVideo(video: any) {
    this.currentVideoSubject.next(video);
  }

  private favVideosSubject = new BehaviorSubject<any[]>([]);
  favVideos$ = this.favVideosSubject.asObservable();

  getFavVideos() {
    return this.favVideosSubject.value;
  }

  updateFavVideos(favVideos:any){
    this.favVideosSubject.next(favVideos);
  }


  private playlistsSubject = new BehaviorSubject<any[]>([]);
  playlists$ = this.playlistsSubject.asObservable();

  updatePlaylists(playlists:any){
    this.playlistsSubject.next(playlists);
  }

  // isInAnyPlaylist(video: any): boolean {
  //   // Implement logic to check if the video is in any playlist
  //   const playlists = this.playlistsSubject.value;
  //   return playlists.some(playlist => playlist.videos.some((v:any) => v.id === video.id));
  // }


  removeVideoFromPlaylist(videoId: any): void {
    // Implement logic to remove the video from the playlist
    const playlists = this.playlistsSubject.value;
    playlists.forEach(playlist => {
      playlist.videos = playlist.videos.filter((v:any) => v.id !== videoId);
    });
    this.updatePlaylists(playlists);
  }

  isInAnyPlaylist(videoId: any): { isIn: boolean, playlistName?: string } {
    // Implement logic to check if the video is in any playlist
    const playlists = this.playlistsSubject.value;

    for (const playlist of playlists) {
      const found = playlist.videos.find((v:any) => v.id === videoId);
      if (found) {
        return { isIn: true, playlistName: playlist.name };
      }
    }

    return { isIn: false };
  }

  // removeVideoFromPlaylist(videoId: any, playlistName: any): void {
  //   // Implement logic to remove the video from a specific playlist
  //   const playlists = this.playlistsSubject.value;

  //   const playlistToUpdate = playlists.find(playlist => playlist.name === playlistName);
  //   if (playlistToUpdate) {
  //     playlistToUpdate.videos = playlistToUpdate.videos.filter((v:any) => v.id !== videoId);
  //     this.updatePlaylists(playlists);
  //   }
  // }
  // Add a method to update the video dimensions and class
  updateVideoDimensions(singleVideo:ElementRef) {
    if (singleVideo && singleVideo.nativeElement) {
      const videoElement =singleVideo.nativeElement;
      // videoElement.addEventListener('loadedmetadata', () => {
        // this.videoWidth = videoElement.videoWidth;
        // this.videoHeight = videoElement.videoHeight;

        // videos like video2 needs to be displayed fully, that;'s why object-contain property is important
        if (videoElement.videoHeight > videoElement.videoWidth) {
          videoElement.classList.add('object-contain');
        } else {
          videoElement.classList.add('object-fill');
        }
      // });
    }
  }




}

