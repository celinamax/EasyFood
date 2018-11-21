import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RestaurantsService } from './restaurants/restaurant/restaurants.service';
import { ShoppingCartService } from './restaurant-detail/shopping-cart/shopping-cart.service';
import { AuthService } from './auth/auth.service';
import { OrderService } from './order/order.service';
import { StorageLocaleService } from './auth/storage.locale.service';
import { CreateRestaurantComponent } from './restaurants/create-restaurant/create-restaurant.component';
import { firebaseConfig } from '../config/firebaseconfig';
import { EditRestaurantComponent } from './restaurants/edit-restaurant/edit-restaurant.component';
import { ListRestaurantComponent } from './restaurants/list-restaurant/list-restaurant.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CreateMenuComponent } from './restaurant-detail/menu/create-menu/create-menu.component';
import { EditMenuComponent } from './restaurant-detail/menu/edit-menu/edit-menu.component';
import { ListMenuComponent } from './restaurant-detail/menu/list-menu/list-menu.component';
import { MenuService } from './restaurant-detail/menu/menu.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    SignupComponent,
    SigninComponent,
    CreateRestaurantComponent,
    EditRestaurantComponent,
    ListRestaurantComponent,
    CreateMenuComponent,
    EditMenuComponent,
    ListMenuComponent
    
  
    ],

    imports: [
    BrowserModule,
    HttpModule,    
    CoreModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    CurrencyMaskModule
  
  ],
  
  providers: [RestaurantsService, ShoppingCartService, AuthService, OrderService, StorageLocaleService, MenuService, {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
