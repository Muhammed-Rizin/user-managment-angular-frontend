import { createAction, props } from '@ngrx/store'
import { User } from '../types/user.type'

export const loadUsers = createAction(`[User Component] Load Users`)
export const loadUsersSuccess = createAction(`[User Component] Load Users Success`, props<{users : User[]}>())
export const loadUsersFailure = createAction(`[User Component] Load Users Failure`, props<{error : any}>())

export const addUsers = createAction(`[User Component] Add Users`, props<{user : User}>())
export const addUsersSuccess = createAction(`[User Component] Add Users Success`, props<{user : User}>())
export const addUsersFailure = createAction(`[User Component] Add Users Failure`, props<{error : any}>())

export const removeUsers = createAction(`[User Component] Remove Users`, props<{id : string}>())
export const removeUsersSuccess = createAction(`[User Component] Remove Users Success`, props<{id : string}>())
export const removeUsersFailure = createAction(`[User Component] Remove Users Failure`, props<{error : any}>())