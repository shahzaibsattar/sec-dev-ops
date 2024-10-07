import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {User} from "../user";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  
  newuser:User = new User();
  email:string = "";
  pwd:string = "";
  loggedin:boolean = false;

  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')){
      this.loggedin = true;
    }else{
      this.loggedin = false;
    
    }
  }

  signin(event:any){
   
    event.preventDefault();
    this.authService.login(this.email,this.pwd).subscribe({
      next:
        (data)=>{
        
          if (data.id != 0){
            this.newuser = new User(data.username,data.email,'',data.avatar,data.id)
            this.authService.setCurrentuser(this.newuser);
            this.router.navigate(['/home']);
          }else{
            this.toastr.error('User login', 'There is a problem with the credentials.');
            
          }
        },
     error: (err:any)=>{
      console.log("There is a problem with the credentials");
     }
       
  
   
  })

}
}
