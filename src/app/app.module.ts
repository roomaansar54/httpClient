import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import {MatIconModule} from '@angular/material/icon'
import { AppComponent } from './app.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { SimilarVideosComponent } from './similar-videos/similar-videos.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { DropdownFavUtilitiesComponent } from './dropdown-fav-utilities/dropdown-fav-utilities.component';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleVideoComponent,
    FavoritesComponent,
    HomepageComponent,
    SimilarVideosComponent,
    PlaylistsComponent,
    DropdownFavUtilitiesComponent,
    SinglePlaylistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatIconModule,
    CommonModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
