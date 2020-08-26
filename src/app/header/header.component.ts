import { Component, OnDestroy, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../auth/token-storage.service";
import { AuthService } from "../auth/auth.service";
import { ParkingService } from "../parking.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  searchProduct: string;

  iterationNumbers: number[];

  get isLoggedAsAdmin(): boolean {
    return this.authService.isAdmin;
  }

  constructor(
    public router: Router,
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private _parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.iterationNumbers = Array(
      this._parkingService.getParking().floors.length
    )
      .fill(0)
      .map((x, i) => i);
  }

  changeFloor(floorNumber: number) {
    this._parkingService.changeFloorNumber(floorNumber);
  }

  addFloor() {
    this._parkingService
      .addFloor(
        this.tokenService.getParking(),
        this.iterationNumbers.length + 1
      )
      .subscribe((value) => {
        this._parkingService.getParking().floors.push({
          nrFloor: this.iterationNumbers.length + 1,
          places: [],
          id: value,
        });
      });

    this.iterationNumbers.push(this.iterationNumbers.length + 1);
  }

  logout() {
    this.tokenService.ignOut();
    this.router.navigate([""]);
    this.authService.changeLoginStatus(false);
  }
}
