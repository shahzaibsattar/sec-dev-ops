import { Injectable, inject } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

 
  private http = inject(HttpClient);
  imgupload(fd:any){
    return this.http.post<any>('http://localhost:3000/api/upload', fd)
      }
}
