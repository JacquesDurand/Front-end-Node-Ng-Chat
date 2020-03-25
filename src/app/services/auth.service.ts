import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { map, tap } from 'rxjs/operators';

interface UserAuth {
  user: UserModel;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject: BehaviorSubject<UserModel>;
  private user$: Observable<UserModel>;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user_storage'));
    this.userSubject = new BehaviorSubject<UserModel>(null);

    if (user) {
      this.userSubject.next(user);
      this.user$ = this.userSubject.asObservable();
    }
  }

  //this.authService.user
  // value === UserModel || null

  get user(): UserModel {
    return this.userSubject.value;
  }

  logUser(email: string, password: string): Observable<UserModel> {
    const data = { email: email, password: password }
    return this.http.post<any>('/users/login', data)
      .pipe(
        tap((data: UserAuth) => console.log(data))
      )
      .pipe(
        map((data: UserAuth) => {
          localStorage.setItem('user_storage', JSON.stringify(data.user));
          localStorage.setItem('token_storage', JSON.stringify(data.token));
          this.userSubject.next(data.user);

          return data.user;
        })
      )
  }

  logOut(): void {
    localStorage.removeItem('user_storage');
    localStorage.removeItem('token_storage');
    this.userSubject.next(null);
  }

  getToken(): string {    
    return JSON.parse(localStorage.getItem('token_storage'));
  }

}
