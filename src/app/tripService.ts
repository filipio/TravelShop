import {Injectable} from '@angular/core';
import {MockTripData} from './mock-trip-data';
@Injectable()
export class TripService{
  trips = MockTripData.Trips;
  getTrips(){
    return this.trips;
  }

}