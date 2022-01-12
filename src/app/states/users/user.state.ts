import { UserDetails } from "src/app/modals/interfaces";


export interface UserState {
    user: UserDetails | null
}

export const initialUserState: UserState = {
    user: null
}