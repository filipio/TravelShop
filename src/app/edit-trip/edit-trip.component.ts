import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripModel} from '../../models/trip-model';
import { DbServiceService } from '../services/db-service.service';

@Component({
  selector: 'edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  @Input() trip: TripModel; 
  @Output() tripUpdated = new EventEmitter<TripModel>();
  editedTrip : TripModel = new TripModel();

  modelForm : FormGroup;
  constructor(private formBuilder : FormBuilder, private dbService : DbServiceService) { }

  ngOnInit(): void {
    this.newForm();
    this.editedTrip = Object.assign({}, this.trip);
  }

  checkEditedTripValues(){
    console.log("edited trip name : " + this.editedTrip.name);
  }

  newForm(){
    this.modelForm = this.formBuilder.group({
      name: [this.trip.name,Validators.compose([Validators.pattern('[a-zA-z!? ]*'), Validators.maxLength(20)])],
      destination: [this.trip.destination,Validators.required],
      beginDate: [this.trip.beginDate,Validators.required],
      endDate: [this.trip.endDate,Validators.required],
      price: [this.trip.price,Validators.compose([Validators.required,Validators.max(30000)])],
      maxSeats: [this.trip.maxSeats,Validators.required],
      description: [this.trip.description, Validators.maxLength(400)],
      photo: [this.trip.photo, Validators.required],
      rating: [this.trip.rating, Validators.required]
    });
  }

  onSubmit(name : String, destination: String, beginDate : string, endDate: string, price: string, maxSeats: string, description : String, photo: String, rating: string)
  {
    console.log("submitting in edit-trip!");
    if(name === "")
      name = "Awesome trip!";
    if(description === "")
      description = "You won't regret it!";
      
    let newTrip : TripModel = new TripModel({name : name,destination : destination,beginDate : beginDate,endDate : endDate,price : Number.parseInt(price),maxSeats:Number.parseInt(maxSeats),description:description,photo:photo,rating: Number.parseInt(rating)});
    newTrip.key = this.trip.key;

    this.dbService.updateTrip(newTrip.key,newTrip);
    this.tripUpdated.emit(newTrip);
  }




}
