import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { BasketItem } from './basket-item';

@Component({
  selector: 'shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit{

  totalCount : number = 0;
  totalPrice : number = 0;
  basketItems : BasketItem[];

  constructor(private basketService : BasketService){
  }

  ngOnInit(): void {
    console.log("ngOnInit is called in shoppingBasketComponent");
    this.totalCount = this.basketService.totalCount;
    this.totalPrice  = this.basketService.totalPrice;
    this.basketItems = this.basketService.basketItems;
  }
}
