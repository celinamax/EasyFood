import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { MenuService } from "../menu.service";
import { RestaurantsService } from '../../../restaurants/restaurant/restaurants.service';

@Component({
  selector: "mt-create-menu",
  templateUrl: "./create-menu.component.html",
  styleUrls: ["./create-menu.component.css"]
})
export class CreateMenuComponent implements OnInit {
  restaurants: any;
  selectedRestaurant: number;
  nameSelectedRestaurant: string;

  constructor(private restaurantService: RestaurantsService,
              private menuService: MenuService) {}

  ngOnInit() {
    this.restaurants = this.restaurantService.getRestaurants();
    console.log(this.restaurants);
  }

  submit(form: NgForm) {
    const value = form.value;
    const newMenu = new MenuItem(
      new Date().valueOf(),
      value.name,
      value.imagePath,
      value.description,
      value.price,
      this.selectedRestaurant
    );
    let calRestaurant = this.menuService.newMenu(newMenu);
    this.selectedRestaurant = null;
    this.nameSelectedRestaurant = null;
    form.reset();
    console.log(calRestaurant);
  }

  addIdRestaurant(id, name) {
    this.nameSelectedRestaurant = name;
    this.selectedRestaurant = id;
    console.log(this.selectedRestaurant);
  }

  onClear(form: NgForm) {
    form.reset();
  }
}
