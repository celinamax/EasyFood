import { ErrorHandler } from '../../app.error-handler';
import * as firebase from 'firebase';
import { MenuItem } from '../menu-item/menu-item.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  constructor(
    private http: Http,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  newMenu(menu: MenuItem) {
    firebase
      .database()
      .ref("/menus/")
      .orderByChild("name")
      .equalTo(menu.name)
      .once("value", snapshot => {
        console.log(snapshot.val());

        if (snapshot.val() === undefined || snapshot.val() == null) {
          let ref = firebase
            .database()
            .ref("/menus/")
            .push(menu)
            .then(snapshot => {
              console.log(snapshot.key);
              let ref = firebase.database().ref("menus/" + snapshot.key);

              ref.on("value", snapshot => {
                console.log(snapshot.val());
                this.toastr.success(                  
                  `${snapshot.val().name}, cadastrado com sucesso!`
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

  menusById(id: number, cb): any {
    let rest = [];
    firebase
      .database()
      .ref("/menus/")
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

  editMenu(menu: any, cb) {
    let item;
    firebase
      .database()
      .ref("/menus/")
      .once("value")
      .then(snapshot => {
        Object.keys(snapshot.val()).map(function(key) {
          if (snapshot.val()[key].id == menu.id) {
            console.log(snapshot.val()[key]);

            var updates = {};

            updates["/menus/" + key + "/"] = menu;

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

  getMenus(): any {
    let rest = [];
    firebase
      .database()
      .ref("/menus/")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(snapItem => {
          rest.push(snapItem.val());
        });
      });

    return rest;
  }

  removeMenu(id, cb) {
    let item;
    firebase
      .database()
      .ref("/menus/")
      .once("value")
      .then(snapshot => {
        Object.keys(snapshot.val()).map(function(key) {
          if (snapshot.val()[key].id == id) {
            console.log(snapshot.val()[key]);

            var updates = {};

            updates["/menus/" + key + "/"] = null;

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

  getMenuOfRestaurant(id: string, cb) {
    let menus = [];
    firebase
      .database()
      .ref("/menus/")
      .once("value")
      .then(snapshot => {
        Object.keys(snapshot.val()).map(function(key) {
          if (snapshot.val()[key].restaurantId == id) {
            console.log(snapshot.val()[key]);

            menus.push(snapshot.val()[key]);

            cb.call(this, {
              item: menus
            });
          }
        });
      })
      .catch(ErrorHandler.handleError);
  }
}
