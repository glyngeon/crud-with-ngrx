import { createAction, props } from "@ngrx/store";
import { Auth } from "src/app/models/auth.model";

export const SIGN_IN_START = 'sign in start';
export const SIGN_IN_SUCCESS = 'sign in success';
export const SIGN_IN_FAILURE = 'sign in failure';
export const AUTO_SIGN_IN = 'auto sign in';

export const SIGN_OUT = 'sign out success';

export const signinStart = createAction(SIGN_IN_START, props<{ email: string, password: string, returnSecureToken: boolean }>());
export const signinSuccess = createAction(SIGN_IN_SUCCESS, props<{ auth: Auth }>());
export const signinFailure = createAction(SIGN_IN_FAILURE);
export const signinAuto = createAction(AUTO_SIGN_IN);

export const signinOut = createAction(SIGN_OUT);