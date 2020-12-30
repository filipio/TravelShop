import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rate-trip',
  templateUrl: './rate-trip.component.html',
  styleUrls: ['./rate-trip.component.css']
})
export class RateTripComponent implements OnInit {

  starsCount:number = 5;
  isRatingEnabled:boolean = true;
  stars: Object[];

  @Output() tripRated : EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(){
    this.stars = new Array(this.starsCount);
    for(let i=0; i<this.starsCount; i++){
      this.stars[i]={clicked:false, hoovered:false};
    }
  }


  handleStarClick(index:number){
    if(this.isRatingEnabled){
      for(let i=0; i<this.starsCount; i++){
        if(i<=index){
          this.stars[i]["clicked"] = true;
        }
        else{
          this.stars[i]["clicked"] = false;
        }
      }
    }
  }

  handleStarMouseEnter(index:number){
    if(this.isRatingEnabled){
      for(let i=0; i<=index; i++){
        this.stars[i]["hoovered"] = true;
      }
    }
  }
  handleStarMouseLeave(index:number){
    if(this.isRatingEnabled){
      for(let i=0; i<=index; i++){
        this.stars[i]["hoovered"] = false;
      }
    }
  }

  rateTrip(){
    if(this.isRatingEnabled)
      {this.isRatingEnabled = false;
      let rating = 0;
      for(let i=0; i<this.stars.length; i++){
        if(this.stars[i]["clicked"]){
          rating++;
        }
      }
      this.tripRated.emit(rating); 
    }
  }

}
