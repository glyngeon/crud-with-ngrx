import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { signinAuto, signinOut, signinStart, signinSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators'
import { Auth } from "src/app/models/auth.model";
import { HttpHandlerService } from "src/app/providers/http-handler.service";
import { UserServiceService } from "src/app/providers/user-service.service";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects {
    constructor(private actions$: Actions, private httpHandler: HttpHandlerService, private userService: UserServiceService, 
        private router: Router) { }

    signIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signinStart),
            exhaustMap((action) => {
                return this.httpHandler.loginCall({email: action.email, password: action.password, returnSecureToken: true  }).pipe(
                    map((response: any) => {
                        const auth = new Auth(response.idToken,
                            response.email,
                            response.expiresIn);
                        // const auth = new Auth('test');
                        this.userService.setUser(response.idToken);
                        this.userService.callIntervalToken(auth);
                        this.router.navigate(['users']);
                        return signinSuccess({auth: auth});
                    }),
                    catchError((err) => {
                        console.log(err);
                        return of(err);
                    })
                )
            })
        )
    })

    autoSignIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signinAuto),
            mergeMap(() => {
                let auth: any = this.userService.getUser();
                console.log(auth);
                return of(signinSuccess({auth}))
            }),
            catchError((errResp) => {
                console.log(errResp);
                return of(errResp);
                // return of(setErrorMessage({ message: errResp.message }))
            })
        )
    })


    signinOut$ = createEffect(() =>  {
        return this.actions$.pipe(
            ofType(signinOut),
            map(() => {
                this.userService.userlogout();
                this.router.navigate(['login']);
            })
        )
    }, { dispatch: false })
}