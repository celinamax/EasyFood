import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RestaurantsService } from '../restaurant/restaurants.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "mt-edit-restaurant",
  templateUrl: "./edit-restaurant.component.html",
  styleUrls: ["./edit-restaurant.component.css"]
})
export class EditRestaurantComponent implements OnInit {
  @ViewChild("restauranteForm") form: NgForm;

  restaurant: any;

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.restaurantService.restaurantsById(
      this.route.snapshot.params["id"],
      snapshot => {
        this.restaurant = snapshot.item;
        this.form.setValue({
          id: this.restaurant.id,
          name: this.restaurant.name,
          category: this.restaurant.category,
          deliveryEstimate: this.restaurant.deliveryEstimate,
          rating: this.restaurant.rating,
          imagePath: this.restaurant.imagePath,
          about: this.restaurant.about,
          hours: this.restaurant.hours
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    this.restaurantService.editRestaurant(form.value, snapshot => {
      let calRestaurant = snapshot.item;

      form.reset();
      this.toastr.success("Sucesso", `Edição efetuada com sucesso`);
      this.router.navigate(["/listrestaurant"]);
      console.log(calRestaurant);
    });
  }
}
