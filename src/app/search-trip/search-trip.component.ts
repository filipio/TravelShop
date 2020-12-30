import { Component, Input, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import {TripModel} from '../../models/trip-model';
import { ChangeContext, Options } from "@angular-slider/ngx-slider";
import { TripsInfo } from '../trip-manager/trips-info';
@Component({
  selector: 'search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.css'],
  
})
export class SearchTripComponent{
  
  @Input() initialMaxSliderValue : number;
  @Input() initialMinSliderValue : number;
  @Input() tripsInfo : TripsInfo;
  @Output() endDateChange : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() beginDateChange : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() priceRangeChange : EventEmitter<ChangeContext> = new EventEmitter<ChangeContext>();
  @Output() ratingChange : EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() destinationChange : EventEmitter<string> = new EventEmitter<string>();

  destination : string = "Destination";
  rating:string ="Rating";
  ratings = [1,2,3,4,5,"any"] 
  value: number = 40;
  highValue: number = 60;


  handleEndDateChange(endDate : string){
    this.endDateChange.emit(new Date(endDate));
  }

  handleBeginDateChange(beginDate : string){
    this.beginDateChange.emit(new Date(beginDate));
  }

  handleUserChangeEnd(changeInfo : ChangeContext){
    this.priceRangeChange.emit(changeInfo);
  }

  handleTripRatingChange(rating : number | string){
    if(typeof rating === "string")
      this.rating = "Rating";
    else
      this.rating = rating.toString();
    this.ratingChange.emit(rating);
  }

  handleTripDestChange(dest : string){
    if(!dest)
      this.destination = "Destination";
    else
      this.destination = dest;
    this.destinationChange.emit(dest);
  }

  getOptions() : Options{
    return this.tripsInfo.options;
  }

  getMinDate() : Date{
    return this.tripsInfo.minDate;
  }

  getMaxDate() : Date{
    return this.tripsInfo.maxDate;
  }

  getUniqueTripDest() : TripModel[]{
    return this.tripsInfo.uniqueTripDestinations;
  } 
}
