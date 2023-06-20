import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectLoaded, selectLoading, selectUsers } from '../state/user/user.selector';
import { loadUsers, removeUsers } from '../state/user/user.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(
    private store : Store,
    private router : Router,
    private toastr : ToastrService,
    private http : HttpClient
  ){}

  users$ = this.store.select(selectUsers)
  loading$ = this.store.select(selectLoading)
  loaded$ = this.store.select(selectLoaded)
  error$ = this.store.select(selectError)
  ngOnInit(): void {
    this.store.dispatch(loadUsers())

    this.http.get('http://localhost:5000/api/admin/admin',{
      withCredentials : true
    }).subscribe((res : any) => {
      Emitters.adminAuth.emit(true)
    },(err) => {
      this.router.navigate(['/admin'])
      Emitters.adminAuth.emit(false)
    })
  }

  removeUser(id : string) : void {
    this.toastr.success('Deleted Successfully','Success')
    this.store.dispatch(removeUsers({id}))
  }

  editUser(id : string) : void {
    this.router.navigate(['admin/edituser',id])
  }

  createUser() : void {
    this.router.navigate(['admin/adduser'])
  }
}
