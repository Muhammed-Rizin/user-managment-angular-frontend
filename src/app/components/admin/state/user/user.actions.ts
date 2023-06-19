import { createAction, props } from '@ngrx/store'
import { User } from '../types/user.type'

export const loadUser = createAction(`[User Component] Load Users`)
export const loadUserSuccess = createAction(`[User Component] Load Users Success`, props<{users : User[]}>())
export const loadUserFailure = createAction(`[User Component] Load Users Failure`, props<{error : any}>())

export const addUser = createAction(`[User Component] Add Users`, props<{user : User}>())
export const addUserSuccess = createAction(`[User Component] Add Users Success`, props<{user : User}>())
export const addUserFailure = createAction(`[User Component] Add Users Failure`, props<{error : any}>())

export const removeUser = createAction(`[User Component] Remove Users`, props<{id : string}>())
export const removeUserSuccess = createAction(`[User Component] Remove Users Success`, props<{id : string}>())
export const removeUserFailure = createAction(`[User Component] Remove Users Failure`, props<{error : any}>())