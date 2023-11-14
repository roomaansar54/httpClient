import { playlists } from './../helpers/videos';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Subscription, filter, fromEvent, switchMap } from 'rxjs';
import { CurrentVideoState } from '../helpers/current-video-state';
import { videos } from '../helpers/videos';
import { VideoService } from '../helpers/video.service';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.css'],
})
export class SingleVideoComponent implements OnInit {
  state = CurrentVideoState;
  readonly videos = videos;
  readonly playlists = playlists;
  similarVideos: any = [];
  currentVideo: any;
  videoWidth = 0;
  videoHeight = 0;
  id!: any ;
  displayPlaylist = false;

  private subscription: Subscription | null = null;

  @ViewChild('media') singleVideo!: ElementRef;
  playlist: any;
  currentVideoIndex: any =0;
  api!: VgApiService;
  // @ViewChild('vg-player') vgPlayer!: ElementRef;


  constructor(private route: ActivatedRoute, private router: Router,
    public videoService:VideoService,
    ) {}

  ngOnInit() {

    this.displayPlaylist = this.route.snapshot.data['displayPlaylist'];
    console.log(this.displayPlaylist)
    if (this.displayPlaylist == false){
      this.videoService.currentVideo$.subscribe((currentvideo) => {
        if (currentvideo) {
          // this.currentVideo = video;
          this.similarVideos = videos.filter((video: any) => {
            if (video.id === currentvideo.id) {
              return false; // Exclude the target video itself.
            }
            // Check if there are common tags between the target video and the current video.
            const commonTags = currentvideo.tags.some((tag: string) =>
              video.tags.includes(tag)
            );
            return commonTags;
          });
        }
      })


      // this.vgPlayer.nativeElement.API.requestPictureInPicture();
      // const videoElement = document.getElementById(
      //   'singleVideo'
      // ) as HTMLVideoElement;
      // videoElement.addEventListener('loadedmetadata', () => {
      //   this.videoWidth = videoElement.videoWidth;
      //   this.videoHeight = videoElement.videoHeight;
      //   if (this.videoHeight > this.videoWidth) {
      //     videoElement?.classList.add('object-contain');
      //   } else {
      //     videoElement?.classList.add('object-fill');
      //   }
      // });
      // this.router.events
      // .pipe(filter(event => event instanceof NavigationEnd))
      // .subscribe(() => {
      //   const newId = this.route.snapshot.paramMap.get('id');
      //   if (newId) {
      //     this.id = newId;
      //     console.log(this.id)
      //     this.currentVideo = videos[parseInt(newId) - 1];
      //     this.state.activeVideo = this.currentVideo;
      //     console.log(this.currentVideo);
      //   }
      // });
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id')!;
          this.videoService.setCurrentVideo(videos[parseInt(id) - 1]); // Update the service with the new video.

          return this.videoService.currentVideo$;
        })
      )
      .subscribe((video) => {
        if (video) {
          console.log(video);
          if (this.singleVideo && this.singleVideo.nativeElement) {
            this.singleVideo.nativeElement.src = video.url;
            this.singleVideo.nativeElement.load(); // Load the new video source
          }

          // this.updateVideoSource(video);
        }
      });


    }
    else{
      this.id = this.route.snapshot.paramMap.get('id');

      this.videoService.playlists$.subscribe((data: any) => {
        this.playlist = data[parseInt(this.id) - 1];
        this.similarVideos = this.playlist.videos
        this.currentVideo = this.playlist.videos[this.currentVideoIndex]
        this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])

      });

    //   this.videoService.playlists$.subscribe((data: any) => {
    //     this.playlist = data[parseInt(this.id) - 1];
    //     this.currentVideo = this.playlist.videos[this.currentVideoIndex]
    //     // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])

    //   });

    }


        // Subscribe to the currentVideo$ observable and update the currentVideo property

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.id = params.get('id')!;
    //   // this.currentVideo = videos[parseInt(this.id)-1];
    //   // this.state.activeVideo = this.currentVideo;
    //   this.videoService.setCurrentVideo(videos[parseInt(this.id)-1]); // Update the service with the new video.

    //   console.log(this.currentVideo);
    // });
    // // this.currentVideo = this.videoService.currentVideo$;

    // this.videoService.currentVideo$.subscribe((video) => {
    //   if (video) {
    //     console.log(video)
    //     // this.currentVideo = video;
    //     // this.state.activeVideo = this.currentVideo;
    //     this.updateVideoSource(video)

    //     // Update the video source dynamically
    //     // if (this.videoElement && this.videoElement.nativeElement) {
    //     //   this.videoElement.nativeElement.src = this.currentVideo.url;
    //     //   this.videoElement.nativeElement.load(); // Load the new video source
    //     // }
    //   }
    // });


    // Define the target video ID for which you want to find similar videos.

    // Define a function to find similar videos based on common tags.

    // Call the function to find similar videos based on tags.
  }

  // onPlayerReady(api: VgApiService) {

  //   this.api = api;
  //   this.playVideo();
  //   // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])

  // }
  // playVideo() {
  //   // const currentPlaylist = this.playlists[this.currentPlaylistIndex];
  //   this.currentVideo = this.playlist.videos[this.currentVideoIndex];
  //   console.log("curren",this.currentVideo)
  //   // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])
  //   console.log(this.currentVideoIndex)

  //   console.log(this.currentVideo)

  //   if (this.currentVideo) {
  //     // this.mediaApi.src = currentVideo.url;
  //     // this.api.load(); // Load the new source
  //     this.api.play();
  //     this.updateVideoSource(this.currentVideo)

  //     // Listen to the ended event to play the next video
  //     this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
  //       console.log('ended');
  //       this.playNext();
  //     });
  //   }
  // }
  // playNext() {
  //   this.currentVideoIndex++;
  //   // this.videoService.setCurrentVideo(this.playlist.videos[this.currentVideoIndex])
  //   console.log(this.currentVideoIndex);
  //   // this.videoService.currentVideo$.subscribe((data:any)=>{
  //   //   console.log(data)
  //   // })

  //   if (
  //     this.currentVideoIndex >=
  //     this.playlists[parseInt(this.id) - 1].videos.length
  //   ) {
  //     this.currentVideoIndex = 0;
  //     // this.currentPlaylistIndex = ((parseInt(this.id)-1) + 1) % this.playlists.length;
  //   }

  //   this.playVideo();
  // }

  private updateVideoSource(video: any) {
    if (this.singleVideo && this.singleVideo.nativeElement) {
      this.singleVideo.nativeElement.src = video.url;
      this.singleVideo.nativeElement.load(); // Load the new video source
    }
  }

  // Add a method to update the video dimensions and class
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
  onPlayerReady(api: VgApiService) {
    if (this.displayPlaylist == true){
      this.api = api;
      this.playVideo();

    }
    else{
      this.api=api;
      this.currentVideo = this.videos[parseInt(this.id)-1];
      this.api.play();
    }

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
      // this.updateVideoSource(this.currentVideo)
      if (this.singleVideo && this.singleVideo.nativeElement) {
        this.singleVideo.nativeElement.src = this.currentVideo.url;
        this.singleVideo.nativeElement.load(); // Load the new video source
      }


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


}
