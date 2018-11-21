import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MenuService } from "../menu.service";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Component({
  selector: "mt-list-menu",
  templateUrl: "./list-menu.component.html",
  styleUrls: ["./list-menu.component.css"]
})
export class ListMenuComponent implements OnInit {
  menus: MenuItem[];

  constructor(
    private menuService: MenuService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menus = this.menuService.getMenus();
    console.log(this.menus);
  }

  removeRestaurant(id) {
    this.menuService.removeMenu(id, snapshot => {
      let calMenu = snapshot.item;
      this.ngOnInit();

      console.log(calMenu);
    });
  }
}
