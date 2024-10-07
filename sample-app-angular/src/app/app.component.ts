import { Component,inject,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  private authServices = inject(AuthService);
 
 
ngOnInit(){

}
  logout(event:any){
    
    this.authServices.logout(event);
    
    
    
    }
   

  
}
