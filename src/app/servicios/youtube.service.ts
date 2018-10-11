import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //,HttpParams 
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {  //pendiente importar el servicio?? en app module?
  
  private apiKeyYoutube="AIzaSyCgC1hEvZaXZ2T1gUtrlA70zl9FpGMvjow";
  private playlistId="UUuaPTYj15JSkETGnEseaFFg";
  nextPageToken="";

  constructor(private http: HttpClient) {
   
  }

  consultarLista(){
   /* const params=new HttpParams();
    params.append('part','snippet');
    params.append('maxResults','10');
    params.append('playlistId',this.playlistId);
    params.append('key',this.apiKeyYoutube);*/
    //console.log("en el servicio");
   // return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems",{params:params})
    let peticion:string;
    if(this.nextPageToken==="")
      peticion='https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId='+this.playlistId+'&key='+this.apiKeyYoutube;
    else
      peticion='https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId='+this.playlistId+'&key='+this.apiKeyYoutube+'&pageToken='+this.nextPageToken;

      return this.http.get(peticion)
      .pipe(map((res:any)=>{
          this.nextPageToken=res.nextPageToken;
          const videos=[];

          for(const video of res.items){
            videos.push(video.snippet);
          }
        
          return videos;
      }));
    }
}
