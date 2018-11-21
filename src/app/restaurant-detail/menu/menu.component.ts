import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestaurantsService } from "../../restaurants/restaurant/restaurants.service";
import { MenuItem } from "../menu-item/menu-item.model";

import { Observable } from "rxjs/Observable";
import { MenuService } from "./menu.service";

@Component({
  selector: "mt-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {
  menu: any;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuService.getMenuOfRestaurant(
      this.route.parent.snapshot.params["id"],
      snapshot => {
        this.menu = snapshot.item;
      }
    );
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }
}
