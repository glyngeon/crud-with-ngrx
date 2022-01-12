import { Auth } from "src/app/models/auth.model";

export interface AuthState {
    auth: Auth | null
}

export const initialAuthState: AuthState = {
    auth: null
}