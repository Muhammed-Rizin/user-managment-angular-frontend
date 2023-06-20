import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(
    private http : HttpClient,
    private router  : Router
  ){}
  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/admin/admin',{
      withCredentials : true
    }).subscribe((res : any) => {
      Emitters.adminAuth.emit(true)
    },(err) => {
      console.log(err.error.message, err)
      this.router.navigate(['/admin'])
      Emitters.adminAuth.emit(false)
    })
  }
}
