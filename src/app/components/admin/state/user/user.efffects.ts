import { Injectable } from '@angular/core'
import * as UserActions from "./user.actions"
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { UserService } from '../../../../services/user.service'
import { catchError, map, of, switchMap } from 'rxjs'
import { User } from '../types/user.type'

@Injectable()
export class UserEffects {
    constructor(
        private actions$ : Actions,
        private userService : UserService
    ){}


    loadUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap(() => 
            this.userService.getUsers().pipe(
                map(users => UserActions.loadUserSuccess({users : users as User[]})),
                catchError(error => of(UserActions.loadUserFailure({error : error})))
            )
            )
        )
    })

    removeUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.removeUser),
            switchMap(payLoad => 
                this.userService.deleteUser(payLoad.id).pipe(
                    map(data => UserActions.removeUserSuccess({id : payLoad.id})),
                    catchError(error => of(UserActions.removeUserFailure({error})))
                )
            )
        )
    })
}