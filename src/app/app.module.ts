import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminRoutingModule } from './components/admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './components/admin/state/user/user.reducer';
import { UserEffects } from './components/admin/state/user/user.efffects';
import { ProfileComponent } from './components/profile/profile.component';
import { userReducerProfile } from './components/state/user.reducer';
import { UserEffectsProfile } from './components/state/user.effects';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({users : userReducer, user : userReducerProfile}),
    EffectsModule.forRoot([UserEffects, UserEffectsProfile]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
