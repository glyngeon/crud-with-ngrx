import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { HttpHandlerService } from "src/app/providers/http-handler.service";
import { addUser, addUserSuccess, getUserStart, getUserSuccess, updateUser, updateUserSuccess, deleteUser, deleteUserSuccess } from "./user.action";
import { UserDetails } from "src/app/models/user.model";
import { of } from "rxjs";
import { UserServiceService } from "src/app/providers/user-service.service";
import { Store } from "@ngrx/store";
import { AppStates } from "src/app/app.state";
import { signinOut } from "../auth/auth.actions";


@Injectable()

export class UserEffects {
    constructor(private actions$: Actions,
        private httpHandler: HttpHandlerService,
        private userService: UserServiceService,
        private store: Store<AppStates>,) {}

    getUserDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUserStart),
            exhaustMap(() => {
                return this.httpHandler.usersCall().pipe(
                    map((response: any) => {
                        // const userData = new UserDetails(response);
                        let resArray: any;
                        if (response) {
                            resArray = Object.keys(response).map(item => {
                                return {
                                    id: item, 
                                    first_name: response[item].first_name,
                                    last_name: response[item].last_name,
                                    avatar: response[item].avatar,
                                    email: response[item].email,
                                    gender: response[item].gender,
                                    mobile: response[item].mobile,
                                    salary: response[item].salary,
                                }
                            });
                        }
                        console.log('response is http-interceptior inside = ', resArray);
                        // return getUserSuccess({userData : response.data})
                        // this.userService.callIntervalToken();
                        return getUserSuccess({userData : resArray})
                    }),
                    catchError((err) => {
                        console.log(err.status + ' ' + err.error.error);
                        this.store.dispatch(signinOut());
                        return of(err.error.error);
                    })
                )
            })
        )
    })


    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addUser),
            exhaustMap((action) => {
                return this.httpHandler.addNewUser(action.userData).pipe(
                    map((response: any) => {
                        return addUserSuccess({userData: action.userData})
                    }),
                    catchError((err) => {
                        console.log(err);
                        return of(err);
                    })
                )
            })
        )
    })


    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateUser),
            exhaustMap((action) => {
                return this.httpHandler.updateUser(action.userData).pipe(
                    map((response: any) => {
                        return updateUserSuccess({userData: action.userData})
                    }),
                    catchError((err) => {
                        console.log(err);
                        return of(err);
                    })
                )
            })
        )
    })

    
    deleteUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteUser),
            exhaustMap((action) => {
                return this.httpHandler.deleteUser(action.id).pipe(
                    map((response: any) => {
                        return deleteUserSuccess({id: action.id})
                    }),
                    catchError((err) => {
                        console.log(err);
                        return of(err);
                    })
                )
            })
        )
    })
}