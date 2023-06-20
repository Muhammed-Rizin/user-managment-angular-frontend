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
    on(UserActions.loadUsers, state => ({...state, loading : true})),
    on(UserActions.loadUsersSuccess, (state, {users}) => ({...state, loading : false, loaded : true, users})),
    on(UserActions.loadUsersFailure, (state, {error}) => ({...state, loading : false, loaded : true, error})),
    on(UserActions.removeUsers, (state, {id}) => ({...state, loading : true})),
    on(UserActions.removeUsersSuccess, (state, {id}) => (
        {...state, loading : false, loaded : true, 
            users : state.users.filter((a) => a._id !== id)})),
    on(UserActions.removeUsersFailure, (state, {error}) => ({...state, loading : false, loaded : true, error })),
) 