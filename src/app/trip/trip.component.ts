import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserData } from 'src/models/userData';
import {TripModel} from '../../models/trip-model';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';
import { DbServiceService } from '../services/db-service.service';
import { UserUpdaterService } from '../services/user-updater.service';
import { UsersService } from '../services/users.service';
import {FreeSeatsAppearance} from './FreeSeatsAppearance';
@Component({
  selector: 'trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{


  @Input() trip:TripModel;
  @Output() tripRemoved : EventEmitter<TripModel> = new EventEmitter<TripModel>();

  freeSeats : number = 3;
  seatsAppearance: FreeSeatsAppearance = new FreeSeatsAppearance();
  stars : any[];
  currTripRating:number = 0;
  anyStar : boolean;
  tripFromService : TripModel;
  today : Date = new Date();

  constructor(private dbServ : DbServiceService, private authService : AuthService,
    private updater : UserUpdaterService){
  }

  ngOnInit(){
    this.stars = new Array(this.trip.rating);
    this.anyStar = this.stars.length>0;
  }

  addReservation(){
    this.trip.availableSeats--;
    this.dbServ.updateTrip(this.trip.key,this.trip);
    this.updater.addTrip(this.trip);
    //this.basketService.addItem(this.trip);
  }

  removeReservation(){
    this.trip.availableSeats++;
    this.dbServ.updateTrip(this.trip.key,this.trip);
    this.updater.removeTrip(this.trip);
    //this.basketService.removeItem(this.trip);
  }

  handleRemoved(){
    this.tripRemoved.emit(this.trip);
  }

  handleTripRated(rating:number){
    this.currTripRating = rating;
  }

  canRemoveReservation() : boolean{
    return this.updater.anyTrip(this.trip);
  }

  canAddReservation() : boolean{
    return this.trip.availableSeats > 0;
  }

  canDelete(){
    return this.authService.isUserAdmin();
  }

}
