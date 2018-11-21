import * as firebase from "firebase";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { StorageLocaleService } from "./storage.locale.service";
import { LocaleUsr } from "./locale_usr.model";
import { LocaleUsrRole } from "./locale_user_role.model";


@Injectable()
export class AuthService {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private storageLocaleService: StorageLocaleService
  ) {}

  singnupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setUserDatabase(user);
        this.toastr.success("Registro efetuado com Sucesso!");
        this.router.navigate(["/"]); //direciona para a página de login
      })
      .catch(error => {
        this.toastr.error("Erro", error);
        console.log(error);
      });
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password) //efetuando login
      .then(response => {
        //login com sucesso

        firebase
          .auth()
          .currentUser.getToken() //busca o token do usuário cadastrado do firebase
          .then((token: string) => {
            let usrToken: LocaleUsr = {
              token: token
            };

            this.storageLocaleService.setLocalToken(usrToken); //salvando o token no localstorage

            let userId = firebase.auth().currentUser.uid; //retorna o id do usuário logado
            firebase
              .database()
              .ref("/users/" + userId)
              .once("value") //busca o usuário por id
              .then(snapshot => {
                let roleUsr: LocaleUsrRole = {
                  //cria um objeto que contenha a permissão do usuário logado
                  role: (snapshot.val() && snapshot.val().role) || "Anonymous"
                };
                this.storageLocaleService.setLocalRole(roleUsr); //salva no storagelocale a permissão do usuário
              });
          });

        this.toastr.success(
          
          `Seja bem vindo(a), ${this.getCurrentUser().email}` //exibe a mensagem no pop up de logado com sucesso
        );
        this.router.navigate(["/home"]); //direciona para a página do home
      })
      .catch(error => {
        this.toastr.error("Error", error);
        console.log(error);
      });
  }

  setUserDatabase(user) {
    firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        uid: user.uid,
        email: user.email,
        role: "user"
      });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(["/"]); //direciona para a tela de login
    this.storageLocaleService.setLocalToken(null); //limpa o storagelocale
    this.toastr.success("Logout realizado com sucesso!"); //exibe a mensagem de logout com sucesso
  }

  getRole() {
    return this.storageLocaleService.getLocalRole().role; //retorna a permissão do storagelocale
  }

  getToken() {
    console.log(`token: ${this.storageLocaleService.getLocalToken()}`);
    return this.storageLocaleService.getLocalToken().token; //consultando o token do storagelocale
  }

  isAuth() {
    return this.storageLocaleService.getLocalToken() != null; //verifica se o usuário está autenticado
  }
}
