import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'mt-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const value = form.value;
    this.authService.singnupUser(value.email, value.password)

  }

}
