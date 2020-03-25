import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConversationModel } from '../models/conversation.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  createConversation(userIds): Observable<ConversationModel> {
    return this.http.post<any>('/conversations/findCreate', userIds);
  }

  getlastConversations(user: UserModel) : Observable<ConversationModel> {
    return this.http.post<any>('/conversations/lastConv', user)
  }
}
