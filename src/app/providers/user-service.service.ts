import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStates } from '../app.state';
import { signinOut } from '../states/auth/auth.actions';
import { Auth } from '../models/auth.model';
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root',
})
export class UserServiceService {
    private previousPath!: string;
    private signOutInterval: any;
    constructor(private activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
        private store: Store<AppStates>,
    ) {
        //auto logout logic
        window.addEventListener('storage', (event) => {
            if (event.storageArea === localStorage) {
                const token = localStorage.getItem('currentUser');
                if (!token) {
                    this.store.dispatch(signinOut());
                }
            }
        })
    }

    getUser(): any {
        const outputObj = localStorage.getItem('currentUser');
        if (outputObj) {
            return JSON.parse(outputObj);
            // return outputObj;
        } else {
            // this.logout();
            return null;
        }
    }

    getEncodedToken() {
        // return sessionStorage.getItem(AppConstants.AUTH_KEYS.TOKEN);
        return localStorage.getItem('currentUser');
    }

    setUser(currentUser: any) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    userlogout() {
        console.log('aaassdffdsfdsdf = ');
        // this.store.dispatch(signinOut());
        localStorage.removeItem('currentUser');
        this.signOutInterval = null;
    }

    callIntervalToken(auth: Auth ) {
        let decoded: any = jwt_decode(auth.getToken);
        console.log('ddddddd ',  decoded);
        // const currentTime = new Date().getTime();
        // const expTime =  new Date().getTime() + +auth.getExpTime * 1000;
        // const expTime =  new Date().getTime() + +auth.getExpTime;
        const timeDiff = decoded.exp - decoded.iat;
        this.signOutInterval = setTimeout(() => {
            console.log(timeDiff)
            this.store.dispatch(signinOut());
        }, timeDiff * 9000);
    }

    authGuardActivate(route: any): any {
        // route is the route where gard is working/ where user wants to go
        const user = this.getUserForAuthGuard();
        if (user) {
            if (route.url.toString() === 'login') {
                if (this.previousPath === 'users') {
                    this.location.back();
                } else {
                    this.router.navigate(['users']);
                }
                return false;
            } else {
                return true;
            }
        } else {
            if (route.url.toString() === 'login') {
                return true;
            } else if (route.url.toString() === 'post') {
                this.router.navigate(['login']);
            } else {
                this.location.back();
                return false;
            }
        }
    }

    getUserForAuthGuard(): any {
        const outputObj = localStorage.getItem('currentUser');
        if (outputObj) {
            return JSON.parse(outputObj);
            // return outputObj;
        } else {
            return null;
        }
    }


}
