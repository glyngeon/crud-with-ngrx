import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from './auth.state'
import { signinOut, signinSuccess } from "./auth.actions";

const _authReducer = createReducer(
    initialAuthState,
    on(signinSuccess, (state, action) => {
        return {
            ...state,
            auth: action.auth
        }
    }),
    on(signinOut, (state, action) => {
        return {
            ...state,
            auth: null
        }
    })

)

export function AuthReducer(state:any, action:any) {
    return _authReducer(state, action);
}