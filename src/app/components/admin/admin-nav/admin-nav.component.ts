import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {

  constructor(
    private http : HttpClient,
    private toastr : ToastrService
  ){}
  logOut() : void {
    this.http.get('http://localhost:5000/api/admin/logout', {
      withCredentials : true
    }).subscribe(()=> (
      this.toastr.success('Successfully loged out', 'Success')))
  }
}
