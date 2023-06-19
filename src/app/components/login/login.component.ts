import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form : FormGroup

  constructor(
    private router : Router,
    private http : HttpClient,
    private formBuilder : FormBuilder,
    private toastr : ToastrService
  ){}
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        email : '',
        password : ''
      })
      this.http.get('http://localhost:5000/api/user',{
        withCredentials : true
      }).subscribe((res : any) => {
        this.router.navigate(['/'])
        Emitters.authEmitter.emit(true)
      },(err) => {
        this.router.navigate(['/login'])
        Emitters.authEmitter.emit(false)
      })
  }

  validateEmail (email : string) : boolean {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(email.match(validRegex)){
      return false
    }else {
      return true
    }
  }

  submit():void {
    let userData = this.form.getRawValue()

    if(userData.email =='' || userData.password == ''){
      this.toastr.error('Please enter all fields', 'Error')
    }else if(this.validateEmail(userData.email)){
      this.toastr.error('Please enter a Valid email', 'Error')
    }else {
      this.http.post("http://localhost:5000/api/login", userData, {
        withCredentials : true
      }).subscribe(
        (res) => (
          this.toastr.success('Successfully loged in', 'Success'),
          this.router.navigate(['/'])),
        (err) => (
          this.toastr.error(err.error.message, 'Error')
        )
      )
    }
  }
}
