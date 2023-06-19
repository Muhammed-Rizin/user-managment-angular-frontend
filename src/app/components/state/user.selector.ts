import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./types/user.types";

export const selectUserState = createFeatureSelector<UserState>('user')

export const selectUser = createSelector(selectUserState, state => state.user)
export const selectLoading = createSelector(selectUserState, state => state.loading)
export const selectLoaded = createSelector(selectUserState, state => state.loaded)