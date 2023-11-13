import { Component, HostListener, OnInit } from '@angular/core';
import { videos } from '../helpers/videos';
import { Router, ParamMap, Route, ActivatedRoute } from '@angular/router';
import { VideoService } from '../helpers/video.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  readonly videos = videos
  data!:any;
  displayVideos:any[] = []
  // favVideos: any[] = [];
  flexContainerClass: string = 'flex-container'; // Default flex container class
  columnsPerRow: number = 4; // Default number of columns per row
  columnWidth: number = 200; // Default column width in pixels


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setColumnsPerRowBasedOnScreenSize();
  }

  constructor(private route:ActivatedRoute, private videoService:VideoService){

  }

  ngOnInit(){
    this.setColumnsPerRowBasedOnScreenSize();

    this.data = this.route.snapshot.data['displayFavorites'];
    console.log(this.data)
    if (this.data == true){
      this.videoService.favVideos$.subscribe((favVideos) => {
        this.displayVideos = favVideos;
      });




    }
    else{
      this.displayVideos = videos
    }

  }
  setColumnsPerRowBasedOnScreenSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768) {
      this.columnsPerRow = 4;
    } else if (screenWidth >= 480) {
      this.columnsPerRow = 3;
    } else {
      this.columnsPerRow = 2;
    }
    this.columnWidth = screenWidth / this.columnsPerRow;

  }

  preprocessVideos(displayVideos: any[]): any[] {
    const videosPerRow = Math.floor(displayVideos.length / this.columnsPerRow);
    console.log(videosPerRow)
    const processedVideos = [];

    for (let i = 0; i < displayVideos.length; i += videosPerRow) {
      processedVideos.push(displayVideos.slice(i, i + videosPerRow));
    }

    return processedVideos;
  }

}
