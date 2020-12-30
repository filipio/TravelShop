import {Pipe, PipeTransform} from '@angular/core';
import {TripModel} from '../../models/trip-model';
@Pipe({ name: 'searchDate' })
export class SearchDate implements PipeTransform {
 transform(trips: TripModel[], beginDate: Date, endDate : Date): TripModel[] {
  if (!trips)
  return [];
  if(! beginDate && !endDate){
    return trips;
  }
  if(!beginDate){
    console.log("no begin, but got the end date");
    console.log("passed end date : " + endDate);
    for(let tripargs of trips){
      console.log("trip arg : " + tripargs.endDate);
    }
    let filtered = trips.filter(trip => new Date(trip.endDate) <= endDate);
    for(let trip of filtered){
      console.log(trip);
    }
    console.log(filtered.length);
    return filtered;
  }
  if(!endDate){
    return trips.filter(trip => new Date(trip.beginDate) >= beginDate);
  }
  return trips.filter(trip => new Date(trip.beginDate) >= beginDate && new Date(trip.endDate) <= endDate);
  }
}