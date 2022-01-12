import { AuthReducer } from "./states/auth/auth.reducer";
import { AUTH_STATE_NAME } from "./states/auth/auth.selector";
import { AuthState } from "./states/auth/auth.state";
import { UserReducer } from "./states/users/user.reducer";
import { USER_STATE_NAME } from "./states/users/user.selector";
import { UserState } from "./states/users/user.state";

export interface AppStates {
    [AUTH_STATE_NAME]: AuthState,
    [USER_STATE_NAME] : UserState
}

export const AppReducers = {
    [AUTH_STATE_NAME]: AuthReducer,
    [USER_STATE_NAME]: UserReducer
}
