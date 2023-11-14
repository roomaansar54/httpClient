import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SingleVideoComponent } from './single-video/single-video.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';

const routes: Routes = [
  { path: 'video/:id', component: SingleVideoComponent, data:{displayPlaylist: false} },
  { path: 'playlists', component: PlaylistsComponent,  },
  { path: 'playlist/:id', component: SingleVideoComponent, data:{displayPlaylist: true} },


  { path: 'favorites', component: HomepageComponent, data:{displayFavorites: true} },
  // { path: 'home', component: HomepageComponent },
  { path: '', component: HomepageComponent, data:{displayFavorites: false} },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
