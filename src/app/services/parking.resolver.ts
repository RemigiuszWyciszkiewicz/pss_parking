import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Parking } from "../models/parking";

import { tap, map } from "rxjs/operators";
import { ParkingService } from "../parking.service";
@Injectable()
export class ParkingResolve implements Resolve<Parking> {
  constructor(private parkingService: ParkingService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.parkingService.getParkingList().pipe(
      tap((value) => {
        this.parkingService.setParking(value);
      }),
      map((value) => {
        return value[0];
      })
    );
  }
}
