import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {User} from '../user';
import { environment } from '../environments/environment';
const server = environment.apiUrl;

@Injectable({providedIn: 'root'})

export class AuthService {

 private http = inject(HttpClient);
 private router = inject(Router);
  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }

  login(email:string,pwd:string){
    return this.http.post<User>(server +'/api/auth', { email: email, upwd: pwd });
  }
  register(email:string,pwd:string,username:string){
    return this.http.post<any>(server +'/api/register', { email: email, upwd: pwd, username:username });
  }
  updateUser(user:User){
    
    return this.http.post<User>(server +'/api/updateuser', { user: user});
  }

  logout(event:any){
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
    

  }
  setCurrentuser(newuser:any){
    sessionStorage.setItem('currentUser',JSON.stringify(newuser));
  }
  getCurrentuser(){
    return sessionStorage.getItem('currentUser');
  }


}


