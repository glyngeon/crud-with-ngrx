import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpHandlerService {
    constructor(public http: HttpClient) {}
    public headers: {} = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

    public getUrl() {
        return environment.apiUrl;
    }

    loginCall(reqParam: any) {
        // return this.http.post('https://bmchelix-cloudopsapi.onbmc.com/v3/users/login', reqParam);
        return this.http.post(this.getUrl() + '?key=' + environment.apiKey, reqParam);
    }

    usersCall() {
        return this.http.get('https://ngrx-crud-4a875-default-rtdb.firebaseio.com/users.json');
    }

    addNewUser(reqParam: any) {
        return this.http.post('https://ngrx-crud-4a875-default-rtdb.firebaseio.com/users.json' , reqParam);
    }

    updateUser(reqParam: any) {
        let tempReq = {
            [reqParam.id]: { ...reqParam }
        }
        return this.http.patch('https://ngrx-crud-4a875-default-rtdb.firebaseio.com/users.json' , tempReq);
    }

    deleteUser(reqParam: any) {
        return this.http.delete(`https://ngrx-crud-4a875-default-rtdb.firebaseio.com/users/${reqParam}.json`);
    }
}
