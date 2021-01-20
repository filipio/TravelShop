import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Credentials } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {

  credentials : Credentials = new Credentials();
  errorInfo = '';
  alertVisible = false;

  constructor(private authService : AuthService, private router : Router) { }

  login(){
    this.authService.login(this.credentials)
    .then(() => {this.router.navigate(['/Trips']);  console.log("navigating to trips...") })
    .catch(err => {this.errorInfo = err.message; this.showAlert();});
  }

  register(){
    this.authService.register(this.credentials)
    .then(() => {this.router.navigate(['/Trips']); })
    .catch(err => {this.errorInfo = err.messasge; this.showAlert(); })
  }

  showAlert() {
    this.alertVisible = true;
  }

  hideAlert() {
    this.alertVisible = false;
  }


}
