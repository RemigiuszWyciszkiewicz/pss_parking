import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthLoginInfo } from "../auth/login-info";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { TokenStorageService } from "../auth/token-storage.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  @ViewChild("loginform") loginform;

  loginData: AuthLoginInfo;

  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  signin() {
    this.isLoginFailed = false;

    this.authService
      .attemptAuth({
        username: this.loginform.value.username,
        password: this.loginform.value.password,
      })
      .subscribe(
        (respone) => {
          this.tokenStorageService.clearParking();
          this.tokenStorageService.clearUsername();
          this.authService.isAdmin = false;
          this.tokenStorageService.saveToken(
            respone.headers.get("Authorization")
          );
          if (this.loginform.value.username === "norbert@test.com") {
            this.loginAsAdmin();
          }
          this.router.navigate(["/parkingSelection"]);
          this.authService.changeLoginStatus(true);
        },
        (error1) => {
          this.isLoginFailed = true;
        }
      );
  }

  loginAsAdmin() {
    this.authService.isAdmin = true;
    this.tokenStorageService.saveUsername("norbert@test.com");
  }
}
