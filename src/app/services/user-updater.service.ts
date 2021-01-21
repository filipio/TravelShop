import { Injectable } from '@angular/core';
import { TripModel } from 'src/models/trip-model';
import { UserData } from 'src/models/userData';
import { UserTrip } from 'src/models/userTrip';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserUpdaterService {

  private user : UserData;

  constructor(private userServ : UsersService) {
    userServ.getUser().subscribe(data => this.user = data);
   }

  addTrip(trip : TripModel){

    if(this.user){
      if(this.user.trips){
        let foundTrip  = Object.values<UserTrip>(this.user.trips).find(t => t.trip.key === trip.key && t.quantity > 0);
        if(foundTrip){
          foundTrip.quantity++;
        }
        else
            this.addNewTrip(trip);    
      }
      else
        this.addNewTrip(trip);

      console.log("sending user to user service from user updater service.");
      this.userServ.updateUser(this.user);
    }
    else console.log("user is not logged - cannot update him!");

  }

  removeTrip(trip : TripModel){
    let foundTrip  = Object.values<UserTrip>(this.user.trips).find(t => t.trip.key === trip.key && t.quantity > 0);
    if(foundTrip)
      foundTrip.quantity--;
    else
        console.log("didn't find the  right trip."); 
    this.userServ.updateUser(this.user);
  }
  

  private addNewTrip(trip: TripModel) {
    if(!this.user.trips) {
      console.log("user doesn't have any trips yet.");
      this.user.trips = {};
  }
    let newUserTrip = new UserTrip();
    newUserTrip.quantity = 1;
    newUserTrip.trip = trip;
    let length = Object.keys(this.user.trips).length;
    if(length > 0){
      let freeIndex = Object.values<UserTrip>(this.user.trips).findIndex(t => t.quantity === 0);
      if(freeIndex >= 0){
        this.user.trips[freeIndex] = newUserTrip;
      }
      else{
        this.user.trips[length] = newUserTrip;
      }
    }
    else{
      this.user.trips[0] = newUserTrip;
    }
    console.log("trip was successfully updated in user updater.");
  }

  anyTrip(trip: TripModel) : boolean{
    if(this.user.trips){
      let foundTrip = Object.values<UserTrip>(this.user.trips).find(t => t.quantity > 0 && t.trip.key === trip.key);
      if(foundTrip)
        return true;
    }
    return false;
  }



}
