import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TripModel} from '../../models/trip-model';
import { BasketService } from '../services/basket.service';
import { DbServiceService } from '../services/db-service.service';
import {FreeSeatsAppearance} from './FreeSeatsAppearance';
@Component({
  selector: 'trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{


  @Input() trip:TripModel;
  @Output() tripRemoved : EventEmitter<TripModel> = new EventEmitter<TripModel>();

  freeSeats:number;
  seatsAppearance: FreeSeatsAppearance = new FreeSeatsAppearance();
  stars : any[];
  currTripRating:number = 0;
  anyStar : boolean;
  tripFromService : TripModel;

  constructor(private basketService : BasketService, private db : DbServiceService){
  }

  showTripFromServiceName(){
    console.log(this.tripFromService.name);
  }

  serviceGetTripWithNameTest(){
    console.log("in test method");
    this.db.getTrip(this.trip.name).subscribe(data => this.tripFromService = data);
  }

  ngOnInit(){
    this.freeSeats = this.trip.maxSeats - this.basketService.reservedTrips(this.trip);
    this.stars = new Array(this.trip.rating);
    this.anyStar = this.stars.length>0;
  }

  addReservation(){
    this.basketService.addItem(this.trip);
    this.freeSeats--;
  }

  removeReservation(){
    this.basketService.removeItem(this.trip);
    this.freeSeats++;
  }

  handleRemoved(){
    this.tripRemoved.emit(this.trip);
  }

  handleTripRated(rating:number){
    this.currTripRating = rating;
  }

}
