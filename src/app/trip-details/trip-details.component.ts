import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripModel } from 'src/models/trip-model';
import { Location } from '@angular/common';
import { DbServiceService } from '../services/db-service.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip : TripModel;

  constructor(private db : DbServiceService, private route : ActivatedRoute, private location:  Location) { }

  ngOnInit(): void {
    this.getTrip();
  }

  getTrip(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("got id : " + id);
    this.db.getTrip(id).subscribe(data => this.trip = data);    
  }

  goBack(){
    this.location.back();
  }

}
