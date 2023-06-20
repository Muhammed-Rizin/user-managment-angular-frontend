import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User, UserState } from "../types/user.type";

export const selectUserState = createFeatureSelector<UserState>('users')
export const selectSingleUserState = createFeatureSelector<User>('user')

export const selectUsers = createSelector(selectUserState, state => state.users)
export const selectLoading = createSelector(selectUserState, state => state.loading)
export const selectLoaded = createSelector(selectUserState, state => state.loaded)
export const selectError = createSelector(selectUserState, state => state.error)

export const selectUserName = createSelector(selectSingleUserState, state => state.name)
export const selectUserEmail = createSelector(selectSingleUserState, state => state.email)