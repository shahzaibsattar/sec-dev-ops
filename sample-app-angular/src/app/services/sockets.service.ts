import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client';
import { Msg } from '../msg';
import { environment } from '../environments/environment';
const server = environment.apiUrl;

const SERVER_URL = server + '/chat';

@Injectable({
  providedIn: 'root'
})

export class SocketsService {
  private socket:Socket = <Socket>{};
 // messages = signal<Msg[]>([]);
  messages:Msg[] = <Msg[]>[];
  constructor() { }

  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  public send(message: string){
    this.socket.emit('message',message);

  }
  getNewMessage(){
    return this.obsFromIO(this.socket,'message');
  }
 

  private obsFromIO(io:any,eventname:any){

    
    return new Observable(observer=>{
        //give new list of messages to anyone that is listening
        io.on(eventname,(data:string)=>{
          let msgdata:Msg = new Msg(data,new Date,1);
         // this.messages.mutate(messages =>{messages.push(msgdata)});
         //this.messages.push(msgdata);
        
        observer.next(msgdata);
      });
    });
   
  }

  joinroom(selroom:string):void{
    this.socket.emit("joinRoom",selroom);
  }
  leaveroom(selroom:string):void{
    this.socket.emit("leaveRoom",selroom);
  }

  reqroomList(){
    this.socket.emit('roomlist','list please');
  }

  getroomList(next:any){
    this.socket.on('roomlist',res=>next(res));

  }

}
