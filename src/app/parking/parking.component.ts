import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Parking, Place, Floor } from "../models/parking";
import { ContextMenuPopupEvent } from "@progress/kendo-angular-menu";

import { ActivatedRoute } from "@angular/router";
import { ParkingService, ParkingPlaceStatus } from "../parking.service";
import { finalize } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-parking",
  templateUrl: "./parking.component.html",
  styleUrls: ["./parking.component.scss"],
})
export class ParkingComponent implements OnInit {
  get parking(): Parking {
    return this._parkingService.getParking();
  }

  get isLoggedAsAdmin(): boolean {
    return this._authService.isAdmin;
  }

  get currentFloor(): Floor {
    return this.parking.floors[this.currentFloorNumber - 1];
  }

  onReservation = () => {
    const selectedParkingPlace = this.currentFloor.places[this.targetSlotId];

    this._parkingService
      .editPlace(selectedParkingPlace.id, ParkingPlaceStatus.NO_FREE)
      .subscribe();
    selectedParkingPlace.free = false;
  };

  onConfirmation = () => {
    const selectedParkingPlace = this.currentFloor.places[this.targetSlotId];
    this._parkingService
      .editPlace(selectedParkingPlace.id, ParkingPlaceStatus.NO_FREE_CONFIRMED)
      .subscribe();
    selectedParkingPlace.confirmed = true;
  };

  onFree = () => {
    const selectedParkingPlace = this.currentFloor.places[this.targetSlotId];
    this._parkingService
      .editPlace(selectedParkingPlace.id, ParkingPlaceStatus.FREE)
      .subscribe();
    selectedParkingPlace.confirmed = false;
    selectedParkingPlace.free = true;
  };

  constructor(
    private readonly _parkingService: ParkingService,
    private readonly _authService: AuthService,
    private route: ActivatedRoute
  ) {}

  currentFloorNumber = 1;
  places: Place[];
  targetSlotId;

  contextMenuOptions = [
    { title: "Reserve", event: this.onReservation, enabled: true },
    { title: "Confirm", event: this.onConfirmation, enabled: true },
    { title: "Free", event: this.onFree, enabled: true },
  ];

  open(event: ContextMenuPopupEvent) {
    this.targetSlotId = event.target.id;
    const targetPlace = this.currentFloor.places[this.targetSlotId];

    this._authService.isAdmin
      ? this.handleContextMenuAdminActions(targetPlace)
      : this.handleContextMenuUserActions(targetPlace);
  }

  handleContextMenuAdminActions(targetPlace: Place) {
    if (targetPlace.free) {
      this.contextMenuOptions[0].enabled = true;
      this.contextMenuOptions[1].enabled = false;
      this.contextMenuOptions[2].enabled = false;
    }

    if (!targetPlace.free && !targetPlace.confirmed) {
      this.contextMenuOptions[0].enabled = false;
      this.contextMenuOptions[1].enabled = true;
      this.contextMenuOptions[2].enabled = true;
    }

    if (targetPlace.confirmed) {
      this.contextMenuOptions[0].enabled = false;
      this.contextMenuOptions[1].enabled = false;
      this.contextMenuOptions[2].enabled = true;
    }
  }

  handleContextMenuUserActions(targetPlace: Place) {
    if (targetPlace.free) {
      this.contextMenuOptions[0].enabled = true;
      this.contextMenuOptions[1].enabled = false;
      this.contextMenuOptions[2].enabled = false;
    }

    if (!targetPlace.free && !targetPlace.confirmed) {
      this.contextMenuOptions[0].enabled = false;
      this.contextMenuOptions[1].enabled = false;
      this.contextMenuOptions[2].enabled = false;
    }

    if (targetPlace.confirmed) {
      this.contextMenuOptions[0].enabled = false;
      this.contextMenuOptions[1].enabled = false;
      this.contextMenuOptions[2].enabled = false;
    }
  }

  addPlace() {
    this._parkingService
      .addPlace(this.currentFloor.id, this.currentFloor.places.length + 1)
      .subscribe((value) => {
        this.places.push({
          nrPlace: this.currentFloor.places.length + 1,
          confirmed: false,
          free: true,
          id: value,
        });
      });
  }

  ngOnInit() {
    console.log(this.parking);
    this._parkingService.currentFloor.subscribe((value) => {
      this.currentFloorNumber = value;
      this.places = this.parking.floors[value - 1].places;
    });
  }
}
