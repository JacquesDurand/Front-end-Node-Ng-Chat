import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const realToken = this.authService.getToken();
        // const realToken = token.substring(1,token.length -1);
        // console.log(realToken);


        if (realToken) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${realToken}`
                }
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }

    }
}