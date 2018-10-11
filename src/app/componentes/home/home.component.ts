import { Component, OnInit } from '@angular/core';
import {YoutubeService} from "../../servicios/youtube.service";
import { DomSeguroPipe} from "../../pipes/dom-seguro.pipe";
declare const $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos:any[]=[];
  constructor( private _youtubeService:YoutubeService) {
    
   }
  videoActual:any;
  ngOnInit() {
    this.cargarMas();
  }

  cargarMas(){
    console.log("carga");
    this._youtubeService.consultarLista()
    .subscribe((videos:any)=>{
      this.videos=videos;
      console.log("los videos");
      //console.log(this.videos);
    });
  }

  verVideo(video){
    this.videoActual=video;
    console.log(video);
    $('#myModal').modal('show');
  }

  cerrarModal(){
    $('#myModal').modal('hide');
    this.videoActual=null;
  }
}
