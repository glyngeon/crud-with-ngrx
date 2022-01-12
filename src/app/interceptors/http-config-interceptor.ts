import { Injectable } from "@angular/core";
// import { AppConstants } from '@app/app.constants';
// import { ToastMessageService } from '@app/core/services/toast-message.service';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppStates } from "../app.state";
import { signinOut } from "../states/auth/auth.actions";


@Injectable()
export class HTTPConfigInterceptor implements HttpInterceptor {

    constructor(
        private store: Store<AppStates>
        // private toastMsgService: ToastMessageService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //let headers;
        // Uncomment below to pass headers and a check when not to send.
        // if (!JSON.parse(localStorage.getItem('currentUser') as string)) {
        //     this.store.dispatch(signinOut());
        // }
        let headers = request.headers
            .set('Content-Type', 'application/json')
        let updatedRequest = request.clone({ headers, 
            params: request.params.append('auth', JSON.parse(localStorage.getItem('currentUser') as string)) });


        // let reqModifiy = request.clone({
        //     params: request.params.append('auth', localStorage.getItem('currentUser') as string)
        // })
        // if (request.url.includes(AppConstants.API_ENDPOINTS.CARBON.UPLOAD_IFA)) {
        //     headers = new HttpHeaders()
        //     updatedRequest = request.clone({ headers });
        // }
        console.log('heasders = ,', updatedRequest);
        return next.handle(updatedRequest).pipe(
            tap((response: HttpEvent<any>) => {
                if (response instanceof HttpResponse && response.status == 200) {
                    console.log('response is http-interceptior = ', response.body);
                    // return resArray;
                    // const apiUrlShowingInlineMessages = AppConstants.API_URLS_SHOWING_CENTER_MESSAGES;
                    // if (!apiUrlShowingInlineMessages.find(element => event.url.indexOf(element) > -1)) {
                    //     if (event.body && (event['body']['messageType'] != AppConstants.HTTP_MESSAGE_TYPE.INFO) &&
                    //         event['body']['shortMessage'] && event['body']['longMessage']) {
                    //         const messageType = event['body']['messageType'];
                    //         const message = { 'shortMessage': event['body']['shortMessage'], 'longMessage': event['body']['longMessage'] }
                    //         if (messageType == AppConstants.HTTP_MESSAGE_TYPE.CONFIRM) {
                    //             this.toastMsgService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.SUCCESS, message);
                    //         } else if (messageType == AppConstants.HTTP_MESSAGE_TYPE.WARN) {
                    //             this.toastMsgService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.WARN, message);
                    //         } else if (messageType == AppConstants.HTTP_MESSAGE_TYPE.ERROR) {
                    //             this.toastMsgService.showToastMessageByType(AppConstants.TOAST_MESSAGE_TYPES.ERROR, message);
                    //         }
                    //     }
                    // }
                }
            }));
    }
}