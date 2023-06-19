import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr : ToastrService
  ){}

  form : FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : '',
      email : '',
      password : ''
    })    
  }

  submit():void {
    let user = this.form.getRawValue()

    if(user.name.trim() == '' || user.email.trim() == '' || user.password.trim() == ''){
      this.toastr.error('Please enter all fields','Error')
    }else if(this.validateEmail(user.email)){
      this.toastr.error('Please enter email properly', 'Error');
    }else {
      this.http.post('http://localhost:5000/api/admin/createuser',user,
        {withCredentials : true}).subscribe(() => (
          this.router.navigate(['/admin/users']),
          this.toastr.success('Added Successfully', 'Success')
        ),
        (err) => {
          this.toastr.error(err.error.message, 'Error')
        })
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
