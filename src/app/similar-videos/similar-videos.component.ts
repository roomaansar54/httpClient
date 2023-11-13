import { Component, Input, OnInit } from '@angular/core';
import { videos } from '../helpers/videos';
import { VideoService } from '../helpers/video.service';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-similar-videos',
  templateUrl: './similar-videos.component.html',
  styleUrls: ['./similar-videos.component.css']
})
export class SimilarVideosComponent implements OnInit {
  // @Input() currentVideo!: any;
  similarVideos:any =[]
  constructor(private videoService: VideoService, private api:VgApiService) {}

  ngOnInit() {

    this.videoService.currentVideo$.subscribe((video) => {
      if (video) {
        // this.currentVideo = video;
        this.similarVideos = this.findSimilarVideos(video, videos);
      }
    });
// console.log(this.currentVideo)
//     this.similarVideos = this.findSimilarVideos(this.currentVideo, videos);


    // Now, `similarVideos` contains an array of videos that share at least one tag with the target video.
    console.log(this.similarVideos);

  }

  findSimilarVideos(currentVideo: any, videos: any) {
    return videos.filter((video: any) => {
      if (video.id === currentVideo.id) {
        return false; // Exclude the target video itself.
      }
      // Check if there are common tags between the target video and the current video.
      const commonTags = currentVideo.tags.some((tag: string) =>
        video.tags.includes(tag)
      );
      return commonTags;
    });
  }

}
