import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RestaurantsService } from '../restaurants/restaurant/restaurants.service';

import { Restaurant } from "../restaurants/restaurant/restaurant.model";

@Component({
  selector: "mt-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html"
})
export class RestaurantDetailComponent implements OnInit {
  
  restaurant: any;

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurant = this.restaurantService.restaurantsById(
      this.route.snapshot.params["id"],
      snapshot => {
        this.restaurant = snapshot.item;
        console.log(this.restaurant);
      }
    );
  }
}
