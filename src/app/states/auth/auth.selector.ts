import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';


const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getToken = createSelector(getAuthState, state => {
    console.log(state);
    return state.auth ? state.auth.getToken : null;
})



export const isAuthenticated = createSelector(getAuthState, state => {
    console.log(state);
    return state.auth ? true : false;
});