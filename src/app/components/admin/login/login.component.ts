import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router,
    private toastr : ToastrService
  ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        email : '',
        password : ''
      })
  }

  validateEmail (email : string) : boolean {
    const validRegex = '^[a-zA-Z0-9.!#$%$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'
    if(email.match(validRegex)){
      return false
    }else {
      return true
    }
  }

  submit() {
    const userData = this.form.getRawValue()
    if(userData.email =='' || userData.password == ''){
      this.toastr.error('Please enter all fields', 'Error')
    }else if(this.validateEmail(userData.email)){
      this.toastr.error('Please enter a Valid email', 'Error')
    }else {
      this.http.post("http://localhost:5000/api/admin/login", userData, {
        withCredentials : true
      }).subscribe(
        (res) => (
          this.toastr.success('Successfully loged in', 'Success'),
          this.router.navigate(['/admin/dashboard'])),
        (err) => (
          this.toastr.error(err.error.message, 'Error')
        )
      )
    }
  }

}
