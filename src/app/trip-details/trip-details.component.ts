import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class TripDetailsComponent implements OnInit, OnChanges {

  trip : TripModel;
  freeSeats : number;
  reserveText:string;
  editMode : boolean = false;

  constructor(
    private db : DbServiceService,
    private route : ActivatedRoute,
    private location: Location,
    private basketService : BasketService){console.log("constructor called");}


  ngOnChanges(): void {
    console.log("on changes called");
  }



  ngOnInit(): void {
    console.log("init called");
    this.getTripData();
  }

  getTripData(){
    const id = this.route.snapshot.paramMap.get('id');
    this.db.getTripByName(id).subscribe(data => {
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

  runEditMode(){
    this.editMode = true;
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

  onTripUpdated(updatedTrip : TripModel){
    this.trip = updatedTrip;
    this.editMode = false;
  }

}
