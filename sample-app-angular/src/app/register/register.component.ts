import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {User} from "../user";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:string = "";
  pwd:string = "";
  username:string="";

  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);
  register(event:any){
    event.preventDefault();
    this.authService.register(this.email,this.pwd,this.username).subscribe({
      next:
        (data)=>{
          if(data.success == true){
            this.toastr.success('User Registered', 'User has been regisered. Please login within your new account.');
            this.router.navigateByUrl('');
          }else{
            this.toastr.error('User Registration', 'There is a registration error. Try again.');
          }
          console.log(data);
          //do somet hing if the user is registered of fail if not.
        }
      });

  }
}
