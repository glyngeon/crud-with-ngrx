import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPConfigInterceptor } from './http-config-interceptor';
// import { ErrorInterceptor } from './error-interceptor';
// import { LoaderInterceptor } from './loader-interceptor';
import { JwtInterceptor } from './jwt-interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPConfigInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];