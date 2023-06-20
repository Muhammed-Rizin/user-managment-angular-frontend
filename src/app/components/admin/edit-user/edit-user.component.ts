import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { loadUser } from '../../state/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  constructor(
    private fromBuilder : FormBuilder,
    private router  : ActivatedRoute,
    private route : Router,
    private http : HttpClient,
    private toastr : ToastrService,
    private store : Store
  ){}

  form : FormGroup
  userName : string
  email : string
  userId : string | null

  ngOnInit(): void {
    this.userId = this.router.snapshot.paramMap.get('id');
    this.getUserData(this.userId as string)
    // this.store.dispatch(loadUser())

    this.form = this.fromBuilder.group({
      name : this.userName,
      email : this.email
    })

    this.http.get('http://localhost:5000/api/admin/admin',{
      withCredentials : true
    }).subscribe((res : any) => {
      Emitters.adminAuth.emit(true)
    },(err) => {
      this.route.navigate(['/admin'])
      Emitters.adminAuth.emit(false)
    })
  }

  validateEmail = (email: any) => {
    var validRegex = '^[a-zA-Z0-9.!#$%$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'
    if (email.match(validRegex)) {
      console.log(email);
      return true;

    } else {
      return false;
    }
  }

  submit() : void {
    const user = this.form.getRawValue()
    user.id = this.userId
    if(user.name.trim() == '' || user.email == ''){
      this.toastr.error('Please enter all fields','Error')
    }else {
      this.http.post('http://localhost:5000/api/admin/edituser',user, {withCredentials : true})
      .subscribe(() => {
        this.route.navigate(['/admin/users']),
        this.toastr.success('Successfully edited', 'Success')
      },(err) => {
        this.toastr.error(err.error.message, 'Error')
      }
      )
    }
  }

  getUserData(id : string) {
    console.log(id)
    this.http.get(`http://localhost:5000/api/admin/editDetails?id=${id}` , {withCredentials : true})
    .subscribe((response : any) => {
      this.userName = response.name
      this.email = response.email
      Emitters.authEmitter.emit(true)
    },(err) => {
      this.toastr.error(err.error.message, 'Error')
    })
  }
}
