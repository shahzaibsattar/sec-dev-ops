import { Component ,inject,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageuploadService } from '../services/imageupload.service';
import { AuthService } from '../services/auth.service';
import {User} from '../user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  private toastr = inject(ToastrService)
  private imgService = inject(ImageuploadService);
  private authService = inject(AuthService);
  selectedfile:any = null;
  imagepath:String ="";
  currentuser:User = new User();

  ngOnInit(){
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    //console.log(this.currentuser);
  }
  onFileSelected(event:any){
    this.selectedfile = event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    
    fd.append('image',this.selectedfile,this.selectedfile.name);
    
    this.imgService.imgupload(fd).subscribe({
      next:(res)=>{  
        this.imagepath = res.data.filename;
        this.currentuser.avatar  = res.data.filename; 
        this.authService.updateUser(this.currentuser).subscribe({
          next:
            (data)=>{ 
              this.toastr.success('User Update', 'User data was updated.');
              }
        });
        this.authService.setCurrentuser(this.currentuser);
      }
    });
  }

}
