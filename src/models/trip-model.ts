export class TripModel{
  key:string;
  name:String;
  destination:String;
  beginDate:string;
  endDate:string;
  price:number;
  availableSeats : number;
  maxSeats:number;
  description:String;
  photo:String;
  rating:number;

  constructor(init?:Partial<TripModel>){
    Object.assign(this,init);
  }

}
