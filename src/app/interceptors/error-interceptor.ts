// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// import { AuthService } from '@app/core/services/auth.service';
// import { ToastMessageService } from '@app/core/services/toast-message.service';
// import { AppConstants } from '@app/app.constants';
// import { AppUtil } from '@app/app.util';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//     INTERNAL_SERVER_HTTP_ERROR_CODE = 500;
//     UNAUTHORISED_SERVER_HTTP_ERROR_CODE = 401;
//     FORBIDDEN_HTTP_ERROR_CODE = 403;
    
//     constructor(private authenticationService: AuthService,
//         private toastMessageService: ToastMessageService, private router: Router
//     ) {
//     }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request)
//             .pipe(
//                 catchError((error: HttpErrorResponse) => {
//                     const apiUrlShowingInlineMessages = AppConstants.API_URLS_SHOWING_INLINE_MESSAGES;
//                     if (!apiUrlShowingInlineMessages.find( element => request.url.indexOf(element) > -1)) {
//                     const errorStatus = error.status;
//                     switch(errorStatus) {
//                         case this.UNAUTHORISED_SERVER_HTTP_ERROR_CODE:
//                                 if (error['error']['message']) {
//                                     this.toastMessageService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.ERROR, AppUtil.getMessageByCode(AppConstants.NMM_MESSAGE_CODES.SESSION_EXPIPRED));
//                                 } else if (error['error']['shortMessage'] && error['error']['longMessage']) {
//                                     const message = { 'shortMessage': error['error']['shortMessage'], 'longMessage': error['error']['longMessage']}
//                                     this.toastMessageService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.ERROR, message);
//                                 }
//                                 this.authenticationService.logOut();
//                                 break;
//                         case this.INTERNAL_SERVER_HTTP_ERROR_CODE:
//                                 this.router.navigate([AppConstants.APP_URLS.INTERNAL_SERVER_ERROR]);
//                                 break;
//                         case this.FORBIDDEN_HTTP_ERROR_CODE:
//                                 if (error['error']['message']) {    
//                                     this.toastMessageService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.ERROR, AppUtil.getMessageByCode(AppConstants.NMM_MESSAGE_CODES.FORBIDDEN_ACCESS));
//                                 }
//                                 this.authenticationService.logOut();
//                                 break;
//                         default:
//                                 if (error['error']['shortMessage'] && error['error']['longMessage']) {
//                                     const message = { 'shortMessage': error['error']['shortMessage'], 'longMessage': error['error']['longMessage']}
//                                     if (error['error']['messageType'] == AppConstants.HTTP_MESSAGE_TYPES.ERROR) {
//                                         this.toastMessageService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.ERROR, message);
//                                     } else if (error['error']['messageType'] == AppConstants.HTTP_MESSAGE_TYPES.WARN){
//                                         this.toastMessageService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.WARN, message);
//                                     }
//                                  }
//                                 break;
//                     }
//                 }
//                     return throwError(error);
//                 })
//             )
//     }
// }