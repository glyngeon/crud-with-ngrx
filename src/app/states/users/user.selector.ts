import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";



export const USER_STATE_NAME = 'users';

const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);


export const getUserDetails = createSelector(getUserState, state => {
    console.log(state);
    return state?.user;
})