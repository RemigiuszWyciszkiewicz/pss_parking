import { Component, OnInit, ViewChild } from "@angular/core";
import { SignUpInfo } from "../auth/signup-info";
import { AuthService } from "../auth/auth.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  isUsernameTaken = false;
  isEmailTaken = false;
  signUpInfo: SignUpInfo;
  @ViewChild("registerForm") registerForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signUp() {
    this.isEmailTaken = false;
    this.isUsernameTaken = false;

    this.authService
      .signUp({
        name: this.registerForm.value.name,
        surName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (value) => {
          console.log(value);
          this.router.navigate(["/table"]);
        },
        (error1) => {
          if (error1.error.msg === "This username is already taken") {
            this.isUsernameTaken = true;
          }
          if (error1.error.msg === "This email is already taken") {
            this.isEmailTaken = true;
          }

          console.log(error1);
        }
      );
  }
}
