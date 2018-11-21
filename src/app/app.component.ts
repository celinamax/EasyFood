import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html'

 })

export class AppComponent implements OnInit {

  content = 'Seja Bem Vindo ao Easy Food!'

  constructor() { }

  ngOnInit() {
     // Initialize Firebase

  firebase.initializeApp({
    apiKey: "AIzaSyAJBGkr46eP97aNpO1Dq3IaACtCVg26lbo",
    authDomain: "easyfood-10637.firebaseapp.com",
    databaseURL: "https://easyfood-10637.firebaseio.com/",
    projectId: "easyfood-10637",
    storageBucket: "easyfood-10637.appspot.com",
    messagingSenderId: "255309891007"
    })

    
  }

}
