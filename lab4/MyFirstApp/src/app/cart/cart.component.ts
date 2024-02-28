<<<<<<< Updated upstream
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();
  sum = this.cartService.getSum(); 
  avg = this.cartService.getAverage();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  })

  constructor(
    private cartService : CartService,
    private formBuilder : FormBuilder,
  ){}

  onSubmit(): void{
    this.items = this.cartService.clearCart();
    console.warn("your order has been submitted", this.checkoutForm.value)
    this.checkoutForm.reset();
  }
  
}
=======
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();
  sum = this.cartService.getSum(); 
  avg = this.cartService.getAverage();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  })

  constructor(
    private cartService : CartService,
    private formBuilder : FormBuilder,
  ){}

  onSubmit(): void{
    this.items = this.cartService.clearCart();
    console.warn("your order has been submitted", this.checkoutForm.value)
    this.checkoutForm.reset();
  }
  
}
>>>>>>> Stashed changes
