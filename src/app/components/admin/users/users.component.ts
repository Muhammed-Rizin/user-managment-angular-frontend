import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoaded, selectLoading, selectUsers } from '../state/user/user.selector';
import { loadUser, removeUser } from '../state/user/user.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(
    private store : Store,
    private router : Router,
    private toastr : ToastrService
  ){}

  users$ = this.store.select(selectUsers)
  loading$ = this.store.select(selectLoading)
  loaded$ = this.store.select(selectLoaded)
  ngOnInit(): void {
      this.store.dispatch(loadUser())
  }

  removeUser(id : string) : void {
    this.toastr.success('Deleted Successfully','Success')
    this.store.dispatch(removeUser({id}))
  }

  editUser(id : string) : void {
    this.router.navigate(['admin/edituser',id])
  }

  createUser() : void {
    this.router.navigate(['admin/adduser'])
  }
}
