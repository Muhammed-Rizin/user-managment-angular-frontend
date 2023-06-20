import { createAction, props } from "@ngrx/store"
import { Profile } from "./types/user.types"

export const loadUser = createAction(`[User Component] Load User`)
export const loadUserSuccess = createAction(`[User Component] Load User Success`, props<{user : Profile}>())
export const loadUserFailure = createAction(`[User Component] Load User Failure`, props<{error : any}>())