export class TripModel{
  key:string;
  name:String;
  destination:String;
  beginDate:string;
  endDate:string;
  price:number;
  maxSeats:number;
  description:String;
  photo:String;
  rating:number;

  constructor(name : String, destination : String, beginDate : string, endDate: string, price : number, maxSeats : number, description : String, photo : String, rating : number){
    this.name = name;
    this.destination = destination;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.price = price;
    this.maxSeats = maxSeats;
    this.description =description;
    this.photo = photo;
    this.rating = rating;
  }

}
