import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from 'src/models/userData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersPath = 'users';
  private users : UserData[];

  constructor(private db : AngularFireDatabase) {
    this.getUsers().subscribe(data => this.users = data);
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
    
  }

}
