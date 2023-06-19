import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import * as UserActions from './user.actions'
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../admin/state/types/user.type";

@Injectable()
export class UserEffectsProfile {
    constructor(
        private actions$ : Actions,
        private userService : UserService
    ){}

    loadUser$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap(() => 
                this.userService.getUser().pipe(
                    map(users => UserActions.loadUserSuccess({user : users as User})),
                    catchError(error => of(UserActions.loadUserFailure({error : error})))
                )
            )
        )
    })
}