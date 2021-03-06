import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem} from "./order.model";



// import {ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})

export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de Crédito', value:'CRD'}
  ]

  constructor(private orderService: OrderService, 
              private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
    paymentOption: this.formBuilder.control ('', [Validators.required])
    })
  }
  orderForm: FormGroup

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
    .map((item:CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
  this.orderService.checkOrder(order)
    .subscribe((orderId: string ) =>{
      this.router.navigate(['/order-summary'])
       this.orderService.clear()
    })
    console.log(order)
  }
  
}
