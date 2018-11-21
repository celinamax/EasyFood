import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

class Order {
    constructor( public paymentOption: string,
                 public orderItems: OrderItem[] = []) {

                 }
}

class OrderItem {
    constructor(public quantity: number, public MenuId: number) {

    }
}

export {Order, OrderItem }