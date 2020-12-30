import {Pipe, PipeTransform} from '@angular/core';
import {TripModel} from '../../models/trip-model';
@Pipe({ name: 'searchDestination' })
export class SearchDestination implements PipeTransform {
 transform(trips: TripModel[], destination : string): TripModel[] {
    if (!trips)
    return [];
    if(!destination || destination === "any"){
      return trips;
    }
    destination = destination.toLowerCase();
    return trips.filter(trip => trip.destination.toLowerCase() == destination);
  }
}