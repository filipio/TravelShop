import {Pipe, PipeTransform} from '@angular/core';
import {TripModel} from '../../models/trip-model';
@Pipe({ name: 'searchRating' })
export class SearchRating implements PipeTransform {
 transform(trips: TripModel[], rating: number | string): TripModel[] {
    if (!trips)
    return [];
    if(!rating){
      return trips;
    }
    if(typeof rating === "string"){
      return trips;
    }
    return trips.filter(trip => trip.rating == rating);
  }
}