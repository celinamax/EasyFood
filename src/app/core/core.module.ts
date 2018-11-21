import { NgModule} from '@angular/core';

import { OrderService } from '../order/order.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from '../restaurants/restaurant/restaurants.service';

@NgModule({
    providers: [ShoppingCartService, RestaurantsService, OrderService]
})
export class CoreModule {

}
