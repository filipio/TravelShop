import { Component, OnInit, ViewChild } from '@angular/core';
import {TripModel} from '../../models/trip-model';
import { TripsInfo } from './trips-info';
import { ChangeContext } from '@angular-slider/ngx-slider';
import { DbServiceService } from '../services/db-service.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'trip-manager',
  templateUrl: './trip-manager.component.html',
  styleUrls: ['./trip-manager.component.css']
})
export class TripManagerComponent{
  
  trips:TripModel[];
  cheapestTrip:number;
  mostExpensiveTrip:number;
  reservedTrips:number = 0;
  defaultPhoto: String = "/src/assets/travelPhoto2.jpg";
  minDate : Date;
  maxDate : Date;
  minPrice : number;
  maxPrice : number;
  rating : number | string;
  destination : string;
  tripsInfo : TripsInfo = new TripsInfo();

  constructor(private service:DbServiceService, private auth : AuthService){
    service.getTrips().subscribe({next : (data) =>{
      this.trips = data;
      this.tripDetails();
      this.tripsInfo.updateInfo(this.trips)}
      
    });
  }

  checkLogin(){
    let logged = this.auth.isLoggedIn();
    console.log("is logged in : " + logged);
  }

  onEndDateChanged(newEndDate: Date){
    this.maxDate = newEndDate;
  }

  onBeginDateChanged(newBeginDate : Date){
    this.minDate = newBeginDate;
  }

  onPriceRangeChanged(changeInfo :ChangeContext){
    this.minPrice = changeInfo.value;
    this.maxPrice = changeInfo.highValue;
  }

  onRatingChanged(rating : number | string){
    this.rating = rating;
  }

  onDestinationChange(dest : string){
    this.destination = dest;
  }

  shouldBeVisible(trip : TripModel){

  }


  tripDetails(){
    this.cheapestTrip = this.trips[0].price;
    this.mostExpensiveTrip = this.trips[0].price;
    for(let trip of this.trips){
      if(trip.price < this.cheapestTrip)
      {
        this.cheapestTrip = trip.price;
      }
      if(trip.price > this.mostExpensiveTrip)
      {
        this.mostExpensiveTrip = trip.price;
      }

    }
  }

  isCheapest(trip : TripModel){
    return trip.price === this.cheapestTrip;
  }

  isMostExpensive(trip : TripModel){
    return trip.price === this.mostExpensiveTrip;
  }

  onTripRemoved(trip: TripModel)
  {
    this.service.removeTrip(trip.key);
    this.tripDetails();
    this.tripsInfo.updateInfo(this.trips);
  }

  isVisible(trip : TripModel){
    if(new Date() >= new Date(trip.beginDate) && this.auth.isUserOnlyReader())
      return false;
    return true;
  }

}
