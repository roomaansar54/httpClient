import { VideoService } from '../helpers/video.service';
import { Component, OnInit } from '@angular/core';
import { videos } from '../helpers/videos';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  readonly videos = videos;

  favVideos: any[] = [];
  constructor(private videoService:VideoService){

  }


  ngOnInit() {
    this.videoService.favVideos$.subscribe((favVideos) => {
      this.favVideos = favVideos;
    });

    // this.favVideos = videos.filter((video) => video.isFavorite === true);





  }

}
