import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripModel} from '../../models/trip-model';
import { DbServiceService } from '../services/db-service.service';
@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})


export class AddTripComponent implements OnInit {

  modelForm : FormGroup;
  tripWasAdded : boolean = false;

  constructor(private formBuilder : FormBuilder, private service : DbServiceService){}

  ngOnInit() : void {
    this.newForm();
  }

  newForm(){
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.compose([Validators.pattern('[a-zA-z!? ]*'), Validators.maxLength(20)])],
      destination: ['',Validators.required],
      beginDate: ['',Validators.required],
      endDate: ['',Validators.required],
      price: ['',Validators.compose([Validators.required,Validators.max(30000)])],
      maxSeats: ['',Validators.required],
      description: ['', Validators.maxLength(400)],
      photo: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  addNewTrip(){
    this.tripWasAdded = false;
  }


  onSubmit(name : String, destination: String, beginDate : string, endDate: string, price: string, maxSeats: string, description : String, photo: String, rating: string)
    {
      if(name === "")
        name = "Awesome trip!";
      if(description === "")
        description = "You won't regret it!";
        
      let newTrip : TripModel = new TripModel(name,destination,beginDate,endDate,Number.parseInt(price),Number.parseInt(maxSeats),description,photo,Number.parseInt(rating));
      this.service.addTrip(newTrip);
      this.tripWasAdded = true;
      this.newForm();
    }

  }

