import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes : Routes = [
    {path : 'admin', component : LoginComponent},
    {path : 'admin',
        children : [
            {path : 'dashboard', component : DashboardComponent },
            {path : 'users', component : UsersComponent },
            {path : 'adduser', component : AddUserComponent },
            {path : 'edituser/:id', component : EditUserComponent}
        ]
    }
]
@NgModule({
    declarations: [
      LoginComponent,
      DashboardComponent,
      AdminNavComponent,
      UsersComponent,
      AddUserComponent,
      EditUserComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }