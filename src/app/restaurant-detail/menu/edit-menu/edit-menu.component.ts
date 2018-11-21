import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MenuService } from "../menu.service";
import { Router, ActivatedRoute } from "@angular/router";
import { RestaurantsService } from '../../../restaurants/restaurant/restaurants.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "mt-edit-menu",
  templateUrl: "./edit-menu.component.html",
  styleUrls: ["./edit-menu.component.css"]
})
export class EditMenuComponent implements OnInit {
  @ViewChild("menuForm") form: NgForm;
  restaurants: any;
  menu: any;
  nameSelectedRestaurant: string;
  selectedRestaurant: number;
  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.restaurants = this.restaurantService.getRestaurants();
    console.log(this.restaurants);

    this.menuService.menusById(this.route.snapshot.params["id"], snapshot => {
      this.menu = snapshot.item;
      console.log(this.menu);
      this.addIdRestaurant(this.menu.restaurantId, this.nameSelectedRestaurant);
      this.form.setValue({
        id: this.menu.id,
        name: this.menu.name,
        imagePath: this.menu.imagePath,
        description: this.menu.description,
        price: this.menu.price,
        restaurantId: this.selectedRestaurant
      });
    });
  }

  submit(form: NgForm) {
    form.value.restaurantId = this.selectedRestaurant;

    console.log(form.value);
    this.menuService.editMenu(form.value, snapshot => {
      let calMenu = snapshot.item;
      this.selectedRestaurant = null;
      this.nameSelectedRestaurant = null;
      form.reset();
      this.toastr.success(`Edição efetuada com sucesso!`);
      this.router.navigate(["/listmenu"]);
      console.log(calMenu);
    });
  }

  addIdRestaurant(id, name) {
    this.selectedRestaurant = id;
    this.nameSelectedRestaurant = name
    console.log(this.selectedRestaurant);
  }
}
