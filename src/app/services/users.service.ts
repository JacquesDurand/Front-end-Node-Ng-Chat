import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  registerUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/users/signin', user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<any>('/users');

  }
}
