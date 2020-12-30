import { Injectable } from '@angular/core';
import { BasketItem } from '../shopping-basket/basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {


  reservedTrips(trip: any) : number {
    let checkedBasketItem = this.basketItems.find(t => t.name === trip.name);
    if(checkedBasketItem){
      return checkedBasketItem.count;
    }
    return 0;
  }

  totalCount : number = 0;
  totalPrice : number = 0;
  basketItems : BasketItem[] = new Array();

  addItem(item : any){
    let checkedBasketItem = this.basketItems.find(t => t.name === item.name);
    if(checkedBasketItem){
      checkedBasketItem.count++;
    }
    else{
      let newItem : BasketItem = {
        destination: item.destination,
        name: item.name,
        price: item.price,
        count: 1 
      };
      this.basketItems.unshift(newItem);
    }
    this.totalCount++;
    this.totalPrice += item.price;
  }

  removeItem(item : any){

    let basketItem =  this.basketItems.find(t => t.name === item.name);
    if(basketItem.count > 1){
      basketItem.count--;
    }
    else{
      let index = this.basketItems.indexOf(basketItem);
      this.basketItems.splice(index,1);
    }
    this.totalCount--;
    this.totalPrice -= item.price;
  }

  


}
