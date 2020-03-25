import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let logged: boolean = false;

    this.authService.userSubject.subscribe(
      (user: UserModel) => {
        if (user) {
          logged = true;
        }
        else logged = false;
      }
    );

    if (logged) return logged
    else {
      this.router.navigate(['/users/login']);
      return logged;
    }


  }

}
