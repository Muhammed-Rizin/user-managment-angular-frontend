import { createAction, props } from "@ngrx/store"
import { Profile } from "./types/user.types"

export const loadUser = createAction(`[User Component] Load Users`)
export const loadUserSuccess = createAction(`[User Component] Load Users Success`, props<{user : Profile}>())
export const loadUserFailure = createAction(`[User Component] Load Users Failure`, props<{error : any}>())