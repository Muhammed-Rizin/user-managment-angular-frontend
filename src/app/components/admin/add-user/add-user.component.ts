import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { addUsers } from '../state/user/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router,
    private toastr : ToastrService,
    private store : Store
  ){}

  form : FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: ''
    })
    this.http.get('http://localhost:5000/api/admin/admin',{
      withCredentials : true
    }).subscribe((res : any) => {
      Emitters.adminAuth.emit(true)
    },(err) => {
      this.router.navigate(['/admin'])
      Emitters.adminAuth.emit(false)
    })
  }

  submit():void {
    console.log('hi');
    let user = this.form.getRawValue()
    console.log(user);
    if(user.name.trim() == '' || user.email.trim() == '' || user.password.trim() == ''){
      this.toastr.error('Please enter all fields','Error')
    }else if(this.validateEmail(user.email)){
      this.toastr.error('Please enter email properly', 'Error');
    }else {
      this.store.dispatch(addUsers({user}))
      this.router.navigate(['/admin/users'])

      
      // this.http.post('http://localhost:5000/api/admin/createuser',user,
      //   {withCredentials : true}).subscribe(() => (
      //     this.router.navigate(['/admin/users']),
      //     this.toastr.success('Added Successfully', 'Success')
      //   ),
      //   (err) => {
      //     this.toastr.error(err.error.message, 'Error')
      //   })
    }
  }

  validateEmail (email : string) : boolean {
    const validRegex = '^[a-zA-Z0-9.!#$%$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'
    if(email.match(validRegex)){
      return false
    }else {
      return true
    }
  }
}
