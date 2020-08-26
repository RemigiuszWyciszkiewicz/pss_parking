import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { TokenStorageService } from "./auth/token-storage.service";
import { ParkingService } from "./parking.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "parking app";

  constructor(
    private authService: AuthService,

    private tokenStorage: TokenStorageService,
    private parkingService: ParkingService
  ) {}
  isLoggedin = false;
  isLoggedin$ = this.authService.getLoggedStatus;
  get parkingFetched() {
    return this.parkingService.getParking();
  }

  ngOnInit(): void {
    this.tokenStorage.getToken()
      ? this.authService.changeLoginStatus(true)
      : this.authService.changeLoginStatus(false);

    this.authService.isAdmin =
      this.tokenStorage.getUsername() === "norbert@test.com";
  }
}
