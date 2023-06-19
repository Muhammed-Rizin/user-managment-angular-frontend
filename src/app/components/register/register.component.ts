import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name : '',
        email : '',
        password : ''
      })
      this.http.get('http://localhost:5000/api/user',{
        withCredentials : true
      }).subscribe((res : any) => {
        this.router.navigate(['/'])
        Emitters.authEmitter.emit(true)
      },(err) => {
        this.router.navigate(['/register'])
        Emitters.authEmitter.emit(false)
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
    submit() : void {
      let user = this.form.getRawValue()

      if(user.name == "" || user.email == "" || user.password == ""){
        this.toastr.error('Please enter all fields', 'Error');
      }else if (this.validateEmail(user.email)){
        this.toastr.error('Please enter email properly', 'Error');
      }else {
        this.http.post("http://localhost:5000/api/register",user,
        {withCredentials : true}).subscribe(
          ()=> (
            this.router.navigate(['/login']),
            this.toastr.success('Registred Successfully', 'Success')
            ),
          (err) => {
          this.toastr.error(err.error.message, 'Error');
        })
      }
    }
}
  