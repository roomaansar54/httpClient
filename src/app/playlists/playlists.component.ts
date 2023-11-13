import { filter } from 'rxjs';
import { VideoService } from './../helpers/video.service';
import { playlists } from './../helpers/videos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit{
  currentVideoIndex = 0;
  activePlaylist :any
  readonly playlists = playlists
  @ViewChild('vgPlayer') vgPlayer: any; // Reference to the Videogular player
  sources !: Array<Object> ;
  classEnded!: boolean;

  extractedPlaylists =[] as any[]
  url!: any;
  constructor(private videoService:VideoService, public api:VgApiService){}

  ngOnInit() {
    // this.api = this.vgPlayer.vgApi;

    this.videoService.playlists$.subscribe({
      next: (data:any)=>{

        for(let playlist of data){

        }

        this.extractedPlaylists = data.filter((playlist:any) => {
          return playlist.videos.length != 0;
      });
              // this.extractedPlaylists = data.filter(())
        console.log(this.extractedPlaylists)

      }
    }
    )

  }


}
