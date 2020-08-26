import { Component, OnInit } from "@angular/core";
import { ParkingService } from "../parking.service";
import { Parking } from "../models/parking";
import { TokenStorageService } from "../auth/token-storage.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-parking-selection",
  templateUrl: "./parking-selection.component.html",
  styleUrls: ["./parking-selection.component.scss"],
})
export class ParkingSelectionComponent implements OnInit {
  get isLoggedAsAdmin(): boolean {
    return this.authService.isAdmin;
  }

  constructor(
    private readonly _parkingService: ParkingService,
    private readonly _tokenStorageService: TokenStorageService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  parking: Parking[];
  formGroup: FormGroup;

  ngOnInit() {
    this._parkingService.setParking(null);
    this.formGroup = this._formBuilder.group({
      street: ["", Validators.required],
      city: ["", Validators.required],
    });
    this._parkingService.getParkingList().subscribe((value) => {
      this.parking = value;
    });
  }

  onParkingSelection(parking: Parking) {
    this._tokenStorageService.saveParking(parking.id);
    this._router.navigate(["parking"]);
  }

  createParking() {
    const address = { ...this.formGroup.value };
    let parkingId;
    this._parkingService
      .createParking({
        ...address,
        open: 1,
        floors: [{ nrFloor: 1, places: [] }],
      })
      .pipe(
        switchMap((value) => {
          parkingId = value;
          return this._parkingService.addFloor(value + "", 1);
        })
      )
      .subscribe((value) => {
        this.parking.push({
          ...address,
          open: true,
          floors: [{ nrFloor: 1, places: [], id: value }],
          id: parkingId,
        });
      });

    this._parkingService.setParking(this.parking);
    this.formGroup.reset();
  }
}
