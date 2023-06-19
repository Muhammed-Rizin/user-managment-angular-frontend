import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Emitters } from 'src/app/emitter/emitter';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  authenticated = false
  constructor (private http : HttpClient, private toastr : ToastrService, private router : Router){}

  ngOnInit(): void {
      Emitters.authEmitter.subscribe((auth : boolean) => {
        this.authenticated = auth
      })
  }


  logOut() : void {
    this.http.post('http://localhost:5000/api/logout',{}, {
      withCredentials : true
    }).subscribe(()=> (
      this.toastr.success('Successfully loged out', 'Success'),
      this.authenticated = false))
  }
}
