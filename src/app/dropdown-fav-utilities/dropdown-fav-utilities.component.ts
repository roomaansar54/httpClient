import { VideoService } from '../helpers/video.service';
import { Component, Input } from '@angular/core';
import { playlists, videos } from '../helpers/videos';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dropdown-fav-utilities',
  templateUrl: './dropdown-fav-utilities.component.html',
  styleUrls: ['./dropdown-fav-utilities.component.css']
})
export class DropdownFavUtilitiesComponent {
  @Input() id:number = 0;
  readonly videos= videos
  // readonly playlists = playlists
  isMenuOpen = false;
  selectedVideo: any; // Use the appropriate data type
  constructor(public videoService:VideoService){}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  addToPlaylist(playlistId: number, event:any) {
    event.preventDefault();
    this.videoService.addToPlaylist(playlistId, videos[this.id-1] )
    // Find the selected playlist
    // const selectedPlaylist = playlists.find((playlist) => playlist.id === playlistId);
    // this.selectedVideo = videos[this.id - 1]

    // if ( this.selectedVideo && selectedPlaylist) {
    //   // Add the selected video to the playlist
    //   selectedPlaylist.videos.push(this.selectedVideo);
    //   window.alert(`Added "${this.selectedVideo.title}" to "${selectedPlaylist.name}" playlist.`)
    //   this.isMenuOpen == false
    //   const updatedPlaylists = playlists.filter((playlist) => {
    //     if (playlist.id === selectedPlaylist.id) {
    //       return selectedPlaylist; // Update the selected playlist
    //     }
    //     return playlist;
    //   });
    //   // const updatedPlaylists = playlists.map((playlist) => {
    //   //   if (playlist.id === selectedPlaylist.id) {
    //   //     return selectedPlaylist; // Update the selected playlist
    //   //   }
    //   //   return playlist;
    //   // });

    //  this.videoService.updatePlaylists(updatedPlaylists)

    // }
  }
    handleFavorites(addOrRemoveCheck:boolean){
      const isFavorite = addOrRemoveCheck === true ? true : false;
      videos[this.id-1].isFavorite = isFavorite;
      this.videoService.updateFavVideos(videos.filter((video) => video.isFavorite === true));

    }
  isInPlaylist(videoId: number): { isIn: boolean, playlistName?: string } {
    return this.videoService.isInAnyPlaylist(videoId);
  }

  removeFromPlaylist() {
    this.videoService.removeVideoFromPlaylist(this.id);
  }



}
