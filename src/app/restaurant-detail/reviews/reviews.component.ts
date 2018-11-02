import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from '../../restaurants/restaurant/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService, 
              private route: ActivatedRoute) { }/*o que o construtor está criando? */

  ngOnInit() {
    this.reviews = this.restaurantsService
    .reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
