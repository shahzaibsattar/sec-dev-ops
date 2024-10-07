import { Component,OnInit, signal,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketsService } from '../services/sockets.service';
import { FormsModule } from '@angular/forms';
import { Msg } from '../msg';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  rooms=[];
  selectedRoom:string="";
  isinRoom= false;
  currentroom:string = "";
  messagecontent:string="";
  currentuser = new User();
  //create signal for values we want to bind to.
  //signals need a default value
  //messageout= signal("");
  messageout:string = "";
  //messagesin = signal<Msg[]>([]);
  
  messagesin:Msg[] = <Msg[]>[];
  //inject the socket service into the class.
  private socketService = inject(SocketsService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.initIoConnection();
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    this.socketService.reqroomList();
    this.socketService.getroomList((msg:string)=>{ this.rooms = JSON.parse(msg)});
    
    }

  //Initialise the socket via the service
  private initIoConnection(){
    this.socketService.initSocket();
    // start listening for new messages and updating the messages signal.
    this.socketService.getNewMessage()
    .subscribe((messages:any)=>{
        this.messagesin.push(messages);     
    });
      

  }
    joinroom(){
      console.log(this.selectedRoom);
      this.socketService.joinroom(this.selectedRoom);
      this.currentroom = this.selectedRoom;
      this.isinRoom = true;
  
    }
    leaveroom(){
      console.log(this.currentroom);
      this.socketService.leaveroom(this.currentroom)
      this.selectedRoom = "";
      this.currentroom = "";
      this.isinRoom = false;
      
    }


  chat(){
    if(this.messageout){
      this.socketService.send(this.messageout);
      this.messageout = "";
    }else{
      console.log('No Message');
    }
  }
}

