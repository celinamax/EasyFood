import { Component, OnInit } from '@angular/core';

import{Restaurant} from './restaurant/restaurant.model';
import{RestaurantsService} from './restaurant/restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
  })
  export class RestaurantsComponent implements OnInit{

    restaurants: Restaurant[]

    constructor(private restaurantsService: RestaurantsService) {}

    ngOnInit() {
      this.restaurants = this.restaurantsService.restaurants() 
      /*A variável restaurants está recebendo a variável restaurantsService 
      com o método restaurants do componente restaurants.component? */

    }

  }

