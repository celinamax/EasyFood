import { Component, OnInit } from "@angular/core";
import { Restaurant } from '../restaurant/restaurant.model';
import { RestaurantsService } from '../restaurant/restaurants.service';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "mt-list-restaurant",
  templateUrl: "./list-restaurant.component.html",
  styleUrls: ["./list-restaurant.component.css"]
})
export class ListRestaurantComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.restaurants = this.restaurantService.getRestaurants();
    console.log(this.restaurants);
  }

  removeRestaurant(id) {
    this.restaurantService.removeRestaurant(id, snapshot => {
      let calRestaurant = snapshot.item;
      this.ngOnInit();

      console.log(calRestaurant);
    });
  }
}
