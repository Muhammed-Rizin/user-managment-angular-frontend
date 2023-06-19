import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  private url = 'http://localhost:5000/api/admin/'
  private userUrl = 'http://localhost:5000/api/'

  getUsers(){
    return this.http.get(`${this.url}users`)
  }

  deleteUser(id : string) {
    console.log('hi')
    return this.http.get(`${this.url}deleteuser?id=${id}`)
  }

  getUser(){
    return this.http.get(`${this.userUrl}user`,{withCredentials : true})
  }
}
