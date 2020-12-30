import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Observable } from 'rxjs';
import{TripModel} from "../../models/trip-model";

export class TripsInfo{

  minDate : Date;
  maxDate : Date;
  minPrice : number = 0;
  maxPrice : number = 100;
  options : Options = {
    floor:this.minPrice,
    ceil:this.maxPrice
  };
  
  uniqueTripDestinations : TripModel[];
  
  updateInfo(trips : TripModel[]){
    this.uniqueTripDestinations = trips.filter((trip,i,arr) => arr.findIndex(t=> t.destination === trip.destination) === i);

    this.minDate = new Date(trips[0].beginDate);
    this.maxDate = new Date(trips[0].endDate);
    this.minPrice = trips[0].price;
    this.maxPrice = trips[0].price;

    for(let trip of trips){
       let tripMinDate = new Date(trip.beginDate);
       let tripMaxDate = new Date(trip.endDate);
      if(trip.price < this.minPrice){
        this.minPrice = trip.price;
      }
      if(tripMinDate < this.minDate){
        this.minDate = tripMinDate;
      }
      if(trip.price > this.maxPrice){
        this.maxPrice = trip.price;
      }
      if(tripMaxDate > this.maxDate){
        this.maxDate = tripMaxDate;
      }
    }
    this.options = {
      floor: this.minPrice,
      ceil: this.maxPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return "<b>" + value + "</b>$";
          case LabelType.High:
            return "<b>" + value + "</b>$";
          default:
            return value + "$";
        }
      }
    }
  }
  
}