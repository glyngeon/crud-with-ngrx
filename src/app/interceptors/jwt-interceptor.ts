import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../providers/user-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: UserServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(this.authService.isUserLoggedIn());
        if (this.authService.getUser()) {
            const aToken = this.authService.getEncodedToken();
            // console.log(aToken);
            request = request.clone({
                // setParams: {
                //     token: aToken
                // }
            });
        }
        return next.handle(request);
    }
}