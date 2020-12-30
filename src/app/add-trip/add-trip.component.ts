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

  defaultPhoto : string = "/src/assets/travelPhoto2.jpg";
  modelForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private service : DbServiceService){}

  ngOnInit() : void {
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.compose([Validators.pattern('[a-zA-z!? ]*'), Validators.maxLength(20)])],
      destination: ['',Validators.required],
      beginDate: ['',Validators.required],
      endDate: ['',Validators.required],
      price: ['',Validators.compose([Validators.required,Validators.max(30000)])],
      maxSeats: ['',Validators.required],
      description: ['', Validators.maxLength(30)],
      photo: ['', Validators.required]
    });
  }


  onSubmit(name : String, destination: String, beginDate : string, endDate: string, price: string, maxSeats: string, description : String, photo: String)
    {
      if(name === "")
        name = "Awesome trip!";
      if(description === "")
        description = "You won't regret it!";
        
      let newTrip : TripModel = new TripModel(name,destination,beginDate,endDate,Number.parseInt(price),Number.parseInt(maxSeats),description,photo,0);

      console.log("adding trip in AddTripComponent");
      console.log("trips key : " + newTrip.key);
      this.service.addTrip(newTrip);
    }

  }

