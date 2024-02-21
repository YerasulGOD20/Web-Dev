import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  sum = 0;
  avg = 0;
  constructor(
    private http : HttpClient
  ) { }


  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }


  getShippingPrices(){
    return this.http.get<{type: string, price: number}[]>
    ('/assets/shipping.json');

  }

  getSum(){
    for (let i = 0; i < this.items.length; i++){
      this.sum += this.items[i].price;
    }
    return this.sum;
  }


  getAverage(){
    length = this.items.length;
    console.log(length)
    this.avg = this.getSum() / length;
    console.log(this.avg)
    return this.avg;
  }
}
