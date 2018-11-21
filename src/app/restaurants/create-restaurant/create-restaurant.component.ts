import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RestaurantsService } from '../restaurant/restaurants.service';
import { Restaurant } from '../restaurant/restaurant.model';

@Component({
  selector: "mt-create-restaurant",
  templateUrl: "./create-restaurant.component.html",
  styleUrls: ["./create-restaurant.component.css"]
})
export class CreateRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService) {}

  ratingValue:number

  ngOnInit() {
    this.ratingValue = 0.0

  }

  submit(form: NgForm) {
    const value = form.value;
    const newRestaurant = new Restaurant(
      new Date().valueOf(),
      value.name,
      value.category,
      value.deliveryEstimate,
      this.ratingValue,
      value.imagePath,      
      value.about,
      value.hours
    );
    let calRestaurant = this.restaurantService.newRestaurant(newRestaurant);
    form.reset();
    console.log(calRestaurant);
  }

  onClear(form: NgForm) {
    form.reset();
  }
}
