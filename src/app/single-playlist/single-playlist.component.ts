import { playlists, videos } from './../helpers/videos';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../helpers/video.service';
import { VgApiService, VgMediaElement } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.css'],
})
export class SinglePlaylistComponent implements OnInit {
  id!: any;
  playlist: any;
  currentVideo!: any;
  videoWidth = 0;
  videoHeight = 0;
  constructor(
    private route: ActivatedRoute,
    public videoService: VideoService
  ) {}
  playlists = playlists;
  // currentPlaylistIndex = 0;
  currentVideoIndex = 0;
  api!: VgApiService;
  mediaApi!: VgMediaElement;
  @ViewChild('media') singleVideo!: ElementRef;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.videoService.playlists$.subscribe((data: any) => {
      this.playlist = data[parseInt(this.id) - 1];
      this.currentVideo = this.playlist.videos[this.currentVideoIndex]
      // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])

    });
    // console.log(this.playlist)




    // this.id = parseInt(this.router.snapshot.paramMap.get("id"))
    // this.videoService.playlists$.subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.playlist = data[0]['videos'];
    //     console.log(this.playlist);
    //   },
    // });
    // this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
    //   this.playNext();
    // });
  }

  onPlayerReady(api: VgApiService) {

    this.api = api;
    this.playVideo();
    // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])

  }

  playVideo() {
    // const currentPlaylist = this.playlists[this.currentPlaylistIndex];
    this.currentVideo = this.playlist.videos[this.currentVideoIndex];
    console.log("curren",this.currentVideo)
    // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])
    console.log(this.currentVideoIndex)

    console.log(this.currentVideo)

    if (this.currentVideo) {
      // this.mediaApi.src = currentVideo.url;
      // this.api.load(); // Load the new source
      this.api.play();
      this.updateVideoSource(this.currentVideo)

      // Listen to the ended event to play the next video
      this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
        console.log('ended');
        this.playNext();
      });
    }
  }
  playNext() {
    this.currentVideoIndex++;
    // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])
    console.log(this.currentVideoIndex);
    // this.videoService.currentVideo$.subscribe((data:any)=>{
    //   console.log(data)
    // })

    if (
      this.currentVideoIndex >=
      this.playlists[parseInt(this.id) - 1].videos.length
    ) {
      this.currentVideoIndex = 0;
      // this.currentPlaylistIndex = ((parseInt(this.id)-1) + 1) % this.playlists.length;
    }

    this.playVideo();
  }
  private updateVideoSource(video: any) {
    if (this.singleVideo && this.singleVideo.nativeElement) {
      this.singleVideo.nativeElement.src = video.url;
      this.singleVideo.nativeElement.load(); // Load the new video source
    }
  }
  updateVideoDimensions() {
    if (this.singleVideo && this.singleVideo.nativeElement) {
      const videoElement = this.singleVideo.nativeElement;
      // videoElement.addEventListener('loadedmetadata', () => {
        this.videoWidth = videoElement.videoWidth;
        this.videoHeight = videoElement.videoHeight;

        // videos like video2 needs to be displayed fully, that;'s why object-contain property is important
        if (this.videoHeight > this.videoWidth) {
          videoElement.classList.add('object-contain');
        } else {
          videoElement.classList.add('object-fill');
        }
      // });
    }
  }

}

// Listen for end of video
// this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
//   this.currentVideoIndex++;
//   if(this.currentVideoIndex > playlists[0].videos.length) {
//     this.classEnded = true;
//   } else {
//     this.setCurrentVideo(playlists[0].videos[this.currentVideoIndex]);
//     this.url = playlists[0].videos[this.currentVideoIndex].url

//     this.onPlayerReady(this.api);

//     this.api.play(); // Rarely works as it fires before video has loaded
//   }
