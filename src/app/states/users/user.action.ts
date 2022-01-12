import { createAction, props } from "@ngrx/store";
import { UserDetails } from "src/app/models/user.model";


export const GET_USER_START = 'get user details start';
export const GET_USER_SUCCESS = 'get user details';

export const ADD_USER = 'add user';
export const ADD_USER_SUCCESS = 'added user successfully';

export const UPDATE_USER = 'update user';
export const UPDATE_USER_SUCCESS = 'updated user successfully';

export const DELETE_USER = 'delete user';
export const DELETE_USER_SUCCESS = 'user deleted successfully';


export const getUserStart = createAction(GET_USER_START);
export const getUserSuccess = createAction(GET_USER_SUCCESS, props<{userData: UserDetails}>());

export const addUser = createAction(ADD_USER, props<{userData: UserDetails}>());
export const addUserSuccess = createAction(ADD_USER_SUCCESS, props<{userData: UserDetails}>());

export const updateUser = createAction(UPDATE_USER, props<{userData: UserDetails}>());
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{userData: UserDetails}>());

export const deleteUser = createAction(DELETE_USER, props<{id: string}>());
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{id: string}>());
