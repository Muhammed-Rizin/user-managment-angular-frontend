import { Injectable } from '@angular/core'
import * as UserActions from "./user.actions"
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { UserService } from '../../../../services/user.service'
import { catchError, map, of, switchMap } from 'rxjs'
import { User } from '../types/user.type'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Injectable()
export class UserEffects {
    constructor(
        private actions$ : Actions,
        private userService : UserService,
        private toastr : ToastrService,
        private router : Router
    ){}


    loadUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() => 
            this.userService.getUsers().pipe(
                map(users => UserActions.loadUsersSuccess({users : users as User[]})),
                catchError(error => of(UserActions.loadUsersFailure({error : error})))
            )
            )
        )
    })

    removeUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.removeUsers),
            switchMap(payLoad => 
                this.userService.deleteUser(payLoad.id).pipe(
                    map(data => UserActions.removeUsersSuccess({id : payLoad.id})),
                    catchError(error => of(UserActions.removeUsersFailure({error})))
                )
            )
        )
    })

    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.addUsers),
            switchMap(payLoad => 
                this.userService.addUser(payLoad.user).pipe(
                    map(data => UserActions.addUsersSuccess({user : payLoad.user}),
                    this.toastr.success('Added Successfully', 'Success')),
                    catchError(error => of(UserActions.addUsersFailure({error})))
                )
            ) 
        )
    })
}