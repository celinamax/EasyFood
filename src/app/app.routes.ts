import {Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent} from './restaurants/restaurants.component';
import { RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent} from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateRestaurantComponent } from './restaurants/create-restaurant/create-restaurant.component';
import { EditRestaurantComponent } from './restaurants/edit-restaurant/edit-restaurant.component';
import { ListRestaurantComponent } from './restaurants/list-restaurant/list-restaurant.component';
import { EditMenuComponent } from './restaurant-detail/menu/edit-menu/edit-menu.component';
import { ListMenuComponent } from './restaurant-detail/menu/list-menu/list-menu.component';
import { CreateMenuComponent } from './restaurant-detail/menu/create-menu/create-menu.component';


export const ROUTES: Routes = [
  {path: '', component: SigninComponent},
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'restaurants/:id', component: RestaurantDetailComponent,

    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full'},
      {path: 'menu', component: MenuComponent},
      {path: 'reviews', component: ReviewsComponent}
    ]},
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'home', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: 'order', loadChildren: './order/order.module#OrderModule'},
    {path: "newrestaurant", component: CreateRestaurantComponent},
    {path: "listrestaurant", component: ListRestaurantComponent},
    {path: "editrestaurant/:id", component: EditRestaurantComponent},
    {path: "newmenu", component: CreateMenuComponent},
    {path: "listmenu", component: ListMenuComponent},
    {path: "editmenu/:id", component: EditMenuComponent}
  ]
  

