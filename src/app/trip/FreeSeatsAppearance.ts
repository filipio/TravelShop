export class FreeSeatsAppearance{

  private noFreeSeats:String = "#ff000061";
  private someSeats: String = "orange";
  private manySeats: String = "chartreuse";


  seatsColor(freeSeats: number) : String{
    if(freeSeats === 0)
      return this.noFreeSeats;
    if(freeSeats <= 3)
      return this.someSeats;
    
    return this.manySeats;
  }
}