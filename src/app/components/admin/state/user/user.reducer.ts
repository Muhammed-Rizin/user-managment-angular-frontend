import { createReducer, on } from "@ngrx/store";
import { UserState } from "../types/user.type";
import * as UserActions from "./user.actions"
import { state } from "@angular/animations";

export const initialState : UserState = {
    users : [],
    loading : false,
    loaded : false,
    error : null
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUser, state => ({...state, loading : true})),
    on(UserActions.loadUserSuccess, (state, {users}) => ({...state, loading : false, loaded : true, users})),
    on(UserActions.loadUserFailure, (state, {error}) => ({...state, loading : false, loaded : true, error})),
    on(UserActions.removeUser, (state, {id}) => ({...state, loading : true})),
    on(UserActions.removeUserSuccess, (state, {id}) => (
        {...state, loading : false, loaded : true, 
            users : state.users.filter((a) => a._id !== id)})),
    on(UserActions.removeUserFailure, (state, {error}) => ({...state, loading : false, loaded : true, error })),
) 