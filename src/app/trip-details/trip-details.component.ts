import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripModel } from 'src/models/trip-model';
import { Location } from '@angular/common';
import { DbServiceService } from '../services/db-service.service';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip : TripModel;
  freeSeats : number;
  reserveText:string;

  constructor(
    private db : DbServiceService,
    private route : ActivatedRoute,
    private location: Location,
    private basketService : BasketService){}

  ngOnInit(): void {
    this.getTripData();
  }

  getTripData(){
    const id = this.route.snapshot.paramMap.get('id');
    this.db.getTrip(id).subscribe(data => {
      this.trip = data;
      this.freeSeats = this.trip.maxSeats - this.basketService.reservedTrips(this.trip);
      this.setReservationText();
     });    
  }

  setReservationText(){
    if(this.freeSeats > 0){
      this.reserveText = "RESERVE NOW!";
    }
    else{
      this.reserveText = "NO MORE FREE SEATS.";
    }
  }

  removeReservation(){
    this.basketService.removeItem(this.trip);
    this.freeSeats++;
    this.setReservationText();
  }

  addReservation(){
    this.basketService.addItem(this.trip);
    this.freeSeats--;
    this.setReservationText();
  }

  goBack(){
    this.location.back();
  }

}
