import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zadWycieczki';
  constructor(private router : Router, public auth : AuthService){}


  
  logout(){
    this.auth.logout()
    .then(() => this.router.navigate(['Login']))
    .catch(err => console.log(err.message));
  }
}

  