import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import {of} from 'rxjs';
import { map} from 'rxjs/operators';
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
    return this.db.list(this.path).snapshotChanges()
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


  getTripByName(name : String) : Observable<TripModel>{
    let searchedTrip  = this.trips.find((trip) => trip.name === name);
    return of(searchedTrip);
  }

  addTrip(trip : TripModel){
    this.db.list(this.path).push(trip);
  }

  removeTrip(key : string){
    this.db.list(this.path).remove(key);
  }

  updateTrip(key : string, value: any){
    this.db.list(this.path).update(key,value);
  }

  // getTrip(key : string){
  //   console.log("getting trip");
  //   return this.getObjectData(this.db.object(this.path + key).snapshotChanges()); // moze nie dzialac ;p 
  // }
}
