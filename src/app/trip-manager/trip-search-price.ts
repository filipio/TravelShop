import {Pipe, PipeTransform} from '@angular/core';
import {TripModel} from '../../models/trip-model';
@Pipe({ name: 'searchPrice' })
export class SearchPrice implements PipeTransform {
 transform(trips: TripModel[], minPrice: number, maxPrice : number): TripModel[] {
    if (!trips)
    return [];
    if(! minPrice && !maxPrice){
      return trips;
    }
    if(!minPrice){
      return trips.filter(trip => trip.price <=maxPrice);
    }
    if(!maxPrice){
      return trips.filter(trip => trip.price >= minPrice);
    }

    return trips.filter(trip => trip.price >= minPrice && trip.price <= maxPrice);
  }
}