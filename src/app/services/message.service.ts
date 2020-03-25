import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageModel } from '../models/message.model';
import { Observable } from 'rxjs';
import { ConversationModel } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  createMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.post<MessageModel>('/messages/add', message);
  }

  getLastMessages(conversation: ConversationModel): Observable<MessageModel[]> {
    return this.http.post<MessageModel[]>('/messages/last', conversation);
  }
}
