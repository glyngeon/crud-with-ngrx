import { createReducer, on } from "@ngrx/store";
import { addUserSuccess, deleteUserSuccess, getUserSuccess, updateUserSuccess } from "./user.action";
import { initialUserState } from "./user.state";


const _userReducer = createReducer(
    initialUserState,
    on(getUserSuccess, (state: any, action) => {
        return {
            ...state,
            user: action.userData
        }
    }),
    on(addUserSuccess, (state: any, action) => {
        console.log(state);
        console.log(action);
        console.log([...state.user, action.userData]);
        return {
            ...state,
            user: [...state.user, action.userData]
        }
    }),
    on(updateUserSuccess, (state: any, action) => {
        console.log(state);
        console.log(action);
        // console.log([...state.user, action.userData]);
        let updatedArray = [...state.user].map((element) => {
            return action.userData.id === element.id ? action.userData : element
        });
        return {
            ...state,
            user: updatedArray
        }
    }),
    on(deleteUserSuccess, (state: any, action) => {
        console.log(state);
        console.log(action);
        // console.log([...state.user, action.userData]);
        let updatedArray = [...state.user].filter((element) => {
            return element.id != action.id
        });
        return {
            ...state,
            user: updatedArray
        }
    })
)

export function UserReducer(state: any, action: any) {
    return _userReducer(state, action)
}