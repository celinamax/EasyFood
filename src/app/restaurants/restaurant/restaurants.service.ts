import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";

import "rxjs/add/operator/mergeMap";

import { Restaurant } from "./restaurant.model";
import { MenuItem } from "../../restaurant-detail/menu-item/menu-item.model";

import { MEAT_API } from "../../app.api";
import { ErrorHandler } from '../../app.error-handler';
import { AuthService } from "../../auth/auth.service";
import * as firebase from "firebase";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class RestaurantsService {
  constructor(
    private http: Http,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  restaurants(): Observable<Restaurant[]> {
    /*está sendo declarada a função*/
    return this.http
      .get(
        `${MEAT_API}/restaurants`
      ) /*(json-server db.json) meat_api = 'http://localhost:3000';*/
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/menu`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }
  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }
  newRestaurant(restaurant: Restaurant) {
    firebase
      .database()
      .ref("/restaurants/")
      .orderByChild("name")
      .equalTo(restaurant.name)
      .once("value", snapshot => {
        console.log(snapshot.val());

        if (snapshot.val() === undefined || snapshot.val() == null) {
          let ref = firebase
            .database()
            .ref("/restaurants/")
            .push(restaurant)
            .then(snapshot => {
              console.log(snapshot.key);
              let ref = firebase.database().ref("restaurants/" + snapshot.key);

              ref.on("value", snapshot => {
                console.log(snapshot.val());
                this.toastr.success(                  
                  `${snapshot.val().name}, cadastrado com sucesso`
                );
              });
            });
        } else {
          let name;
          Object.keys(snapshot.val()).map(function(key) {
            name = snapshot.val()[key].name;
          });
          this.toastr.error("Erro", `${name} já existe`);
        }
      })
      .catch(ErrorHandler.handleError);
  }
  getRestaurants(): any {
    let rest = [];
    firebase
      .database()
      .ref("/restaurants/")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(snapItem => {
          rest.push(snapItem.val());
        });
      });

    return rest;
  }
  restaurantsById(id: number, cb): any {
    let rest = [];
    firebase
      .database()
      .ref("/restaurants/")
      .once("value")
      .then(snapshot => {
        Object.keys(snapshot.val()).map(function(key) {
          if (snapshot.val()[key].id == id) {
            console.log(snapshot.val()[key]);
            rest.push(snapshot.val()[key]);
            cb.call(this, {
              item: snapshot.val()[key]
            });
          }
        });
      });
  }

  editRestaurant(restaurant: any, cb) {
    let item;
    firebase
      .database()
      .ref("/restaurants/")
      .once("value")
      .then(snapshot => {
        Object.keys(snapshot.val()).map(function(key) {
          if (snapshot.val()[key].id == restaurant.id) {
            console.log(snapshot.val()[key]);

            var updates = {};

            updates["/restaurants/" + key + "/"] = restaurant;

            item = firebase
              .database()
              .ref()
              .update(updates);

            cb.call(this, {
              item: snapshot.val()[key]
            });
          }
        });
      })
      .catch(ErrorHandler.handleError);
  }
  removeRestaurant(id, cb) {
    let item;
    firebase
      .database()
      .ref("/restaurants/")
      .once("value")
      .then(snapshot => {
        Object.keys(snapshot.val()).map(function(key) {
          if (snapshot.val()[key].id == id) {
            console.log(snapshot.val()[key]);

            var updates = {};

            updates["/restaurants/" + key + "/"] = null;

            item = firebase
              .database()
              .ref()
              .update(updates);

            cb.call(this, {
              item: snapshot.val()[key]
            });
          }
        });
      })
      .catch(ErrorHandler.handleError);
  }
}
