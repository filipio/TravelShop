import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripModel } from 'src/models/trip-model';
import { UserData } from 'src/models/userData';
import { UserTrip } from 'src/models/userTrip';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private usersPath = 'users';
  private users : UserData[];
  loggedMail : string;

  constructor(private db : AngularFireDatabase) {
    this.getUsers().subscribe(data => this.users = data);
    if("") console.log(" empty is true");
    else console.log("empty is false");
   }

  getUserRoles() : Observable<UserData[]>{
    return this.db.list<UserData>(this.usersPath).valueChanges();
  }

  getUsers(){
    return this.formatUsers(this.db.list(this.usersPath).snapshotChanges());
  }

  addUser(user: UserData){
    this.db.list(this.usersPath).push(user).then( () => console.log("user sucessfully added."));
  }

  private formatUsers(usersData : Observable<any>)
  {
    return usersData.pipe(map(changes =>
      changes.map(c =>
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      ))
      );
  }

  private getUserByEmail(email : string){
    let user  = this.users.find((user) => user.email === email);
    return of(user);
  }

  getUser(){
    console.log("email : " + this.loggedMail);
    return this.getUserByEmail(this.loggedMail);
  }

  updateUser(user: UserData) {
    this.db.list(this.usersPath).update(user.key, user).then(() => console.log("user was successfully updated in user service."));
  }

}
