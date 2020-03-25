import { Observable } from 'rxjs';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

export const API_URL = new InjectionToken<string>('apiURL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(@Inject(API_URL) private baseURL: string) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cloned = req.clone({
            url: this.generateURL(req.url)
        });

        return next.handle(cloned)
    }
    /**
     * https://chucknorris.io/random (absolute)
     * /users/login (relative)
     */

    public isAbsoluteURL(url: string) {
        return (/^https?:\/\//).test(url)
    }

    public generateURL(url: string): string {
        //chemin relatif
        if (!this.isAbsoluteURL(url)) {
            // `{http://localhost:3000}{/users/signin}`
            url = `${this.baseURL}${url}`
        }
        return url;

    }
}