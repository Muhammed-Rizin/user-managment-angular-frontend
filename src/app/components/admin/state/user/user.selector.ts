import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../types/user.type";

export const selectUserState = createFeatureSelector<UserState>('users')

export const selectUsers = createSelector(selectUserState, state => state.users)
export const selectLoading = createSelector(selectUserState, state => state.loading)
export const selectLoaded = createSelector(selectUserState, state => state.loaded)


