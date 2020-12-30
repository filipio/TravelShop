import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable, pipe } from 'rxjs';
import {of} from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { TripModel } from 'src/models/trip-model';
@Injectable({
  providedIn: 'root'
})
export class DbServiceService{

  path="trips";
  itemsCount : number;
  trips : TripModel[];

  constructor(private db : AngularFireDatabase) { 
    this.getTrips().subscribe(data => this.trips =  data);
  }

  private getRawData() : Observable<any>{
    return this.db.list(this.path).snapshotChanges();
  }

  private getObjectData(data : Observable<any>) : Observable<any>{
    return data.pipe(map(changes =>
      changes.map(c =>
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      ))
      );
  }

  getTrips(): Observable<any>{
    let rawData = this.getRawData();
    return this.getObjectData(rawData);
  }


  getTrip(name : String) : Observable<TripModel>{
    let searchedTrip  = this.trips.find((trip) => trip.name === name);
    console.log("found trip with name :  " + searchedTrip.name);
    console.log("argument trip name : " + name );
    return of(searchedTrip);
  }

  addTrip(trip : TripModel){
    this.db.list(this.path).push(trip);
    console.log("change. itemsCount is equal to : " + this.itemsCount);
  }

  removeTrip(key : string){
    console.log("removing key : " + key);
    this.db.list(this.path).remove(key);
  }

}
