import { State, createReducer, on } from '@ngrx/store'
import * as UserActions from './user.actions'
import { UserState } from './types/user.types'

export const initialState : UserState = {
    user: {
        _id: '',
        name: '',
        email: '',
        image: '',
        password: ''
    },
    loading: false,
    loaded: false,
    error: null
}
export const userReducerProfile = createReducer(
    initialState,
    on(UserActions.loadUser, state => ({...state, loading : true})),
    on(UserActions.loadUserSuccess, (state, {user}) => ({...state, loading : false, loaded : true, user})),
    on(UserActions.loadUserFailure, (state, {error}) => ({...state, loading : false, loaded : true, error})),
)