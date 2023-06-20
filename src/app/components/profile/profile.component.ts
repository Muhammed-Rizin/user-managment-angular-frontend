import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from '../../components/state/user.actions'
import { selectUser } from '../state/user.selector';
import { Emitters } from 'src/app/emitter/emitter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router,
    private store : Store,
    private toastr : ToastrService

  ){}

  form : FormGroup
  name : string
  email : string
  image : string
  state : boolean = false
  selectedImage : any | File  
  user$ : any | string

  
  
  cloudinaryConfig: any;
  ngOnInit(): void {
    this.store.dispatch(loadUser())

    this.form = this.formBuilder.group({
      image: [''],
    })

    this.user$  = this.store.select(selectUser).subscribe((data) => {
      this.name = data?.name
      this.email = data?.email
      this.image = data?.image
      if(data.image) {
        this.state = true
      }else {
        this.state = false
      }
    })

    this.http.get('http://localhost:5000/api/user',{
        withCredentials : true
      }).subscribe((res : any) => {
        Emitters.authEmitter.emit(true)
      },(err) => {
        this.router.navigate(['/login'])
        Emitters.authEmitter.emit(false)
      })
  }

  uploadImage(files  : any){
    this.selectedImage = <File>files.files[0]
  }
  

  onSubmit() : void {
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    console.log(formData);
    this.http.post('http://localhost:5000/api/profile-upload-single', formData, {
      withCredentials: true
    }).subscribe((response: any) => {
        Emitters.authEmitter.emit(true)
        this.store.dispatch(loadUser())
      Emitters.authEmitter.emit(true)
      this.toastr.success('Saved', 'Success')
    }, (err) => {
      this.toastr.error(err.error.message, 'Error')
    })
  }

}
