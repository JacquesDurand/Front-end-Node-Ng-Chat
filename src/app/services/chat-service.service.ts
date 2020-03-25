import { Injectable, Inject, InjectionToken } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { ConversationModel } from '../models/conversation.model';
export const API_URL = new InjectionToken<string>('apiURL');


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket;


  constructor(@Inject(API_URL) private baseURL: string) {
    this.socket = io(baseURL);
  }

  public sendMessage(message: MessageModel) {
    this.socket.emit('new-message', message);
  }

  public createRoom(conversation: ConversationModel) {
    this.socket.emit('createRoom', conversation)
    console.log('createRoom sent');

  }

  public getRoom = () => {
    this.socket.on('connectedToRoom', room => {
      console.log(room);

    })
  }

  public sendTyping = () => {
    this.socket.emit('typing');
  }

  public sendStopTyping = () => {
    this.socket.emit('stop-typing');
  }

  public receiveTyping = () => {
    return Observable.create((observer)=>{
      this.socket.on('typing', () => {
        observer.next();
      })
    })
  }

  public receiveNotTyping = () => {
    return Observable.create((observer)=> {
      this.socket.on('stop-typing', () => {
        observer.next();
      })
    })
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('broadcast', (message) => {
        observer.next(message);
      });
    });
  }
}
