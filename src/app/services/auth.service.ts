import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { User } from 'firebase';
import { Observable } from 'rxjs/index';
//import * as firebase from 'firebase/app';

import { map } from 'rxjs/operators';
import { UserData } from 'src/models/userData';
import { UserTrip } from 'src/models/userTrip';
import { DbServiceService } from './db-service.service';
import { UsersService } from './users.service';



export class Credentials { 
  email : string = '';
  password : string = '';
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user : any;
  usersRoles = new Map<string, string[]>();

  constructor(private afAuth : AngularFireAuth, private usersService : UsersService) {
    this.afAuth.setPersistence('session');
    this.afAuth.authState.subscribe(data => {this.user = data; if(data) this.usersService.loggedMail = data.email});
    this.usersService.getUserRoles().subscribe(roles => {
      roles.forEach(userRole => {
        console.log("email : " + userRole.email);
        this.usersRoles.set(userRole.email, userRole.roles);
      })
    })
  }

  isLoggedIn(){
    return this.user != null;
  }

  loggedMail() : string{
    if(!this.isLoggedIn)
      return "";
    return this.user.email;
  }


  login({email,password} : Credentials){
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then(() => {console.log("successfully logged in.")});
  }

  register({email,password} : Credentials){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
                  console.log("successfully registered.");
                  let user = new UserData(email);
                  this.usersService.addUser(user);
                });
  }

  logout(){
    console.log("sign out call");
    return this.afAuth.signOut()
    .then(() => {console.log("successfully logged out.")});
  }

  private checkAuthorization(user : any, allowedRoles : string[]) : boolean{
    if(!user) return false;
    let roles = this.usersRoles.get(user.email);
    if( roles == null) return false;
    for(const role of allowedRoles){
      if(Object.values(roles).includes(role)) return true;
    }
    return false;
  }

  isUserAdmin(){
    return this.checkAuthorization(this.user, ['Admin']);
  }

  isUserOnlyReader(){
    let answer = this.usersRoles.get(this.user.email) == null;
    console.log("is user only reader : " + answer);
    return answer;
  }

}
