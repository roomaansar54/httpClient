import { videos } from './helpers/videos';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'httpClient';
  readonly videos = videos

  constructor(){}
  ngOnInit() {
    // without type safe method
  //   this.appService.getBookDetails()
  //   .subscribe({
  //     next: (data:any)=>console.log(data),
  //     error: (error)=>{console.log(error)}
  //  });

   // with type safe method
}
}
