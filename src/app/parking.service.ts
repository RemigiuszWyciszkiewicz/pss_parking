import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { Parking, Place, Floor } from "./models/parking";

import { TokenStorageService } from "./auth/token-storage.service";

import { HttpClient } from "@angular/common/http";

export enum ParkingPlaceStatus {
  NO_FREE = "noFree",
  FREE = "Free",
  NO_FREE_CONFIRMED = "noFreeConfirmed",
}

@Injectable({
  providedIn: "root",
})
export class ParkingService {
  apiUrl = "http://54.93.238.30";

  private parking: Parking[];

  private floorChanges = new BehaviorSubject(1);
  currentFloor = this.floorChanges.asObservable();

  changeFloorNumber(floorNumber: number) {
    this.floorChanges.next(floorNumber);
  }

  getParking(): Parking {
    if (this.parking) {
      return this.parking.find(
        (value) => value.id === this.tokesStorage.getParking()
      );
    }
    return null;
  }

  setParking(parking: Parking[]): void {
    this.parking = parking;
  }

  constructor(
    private http: HttpClient,
    private tokesStorage: TokenStorageService
  ) {}

  getParkingList(): Observable<Parking[]> {
    return this.http.get<Parking[]>(this.apiUrl + "/parking/getAll");
  }

  addPlace(floorId: string, placeNumber: number): Observable<Place> {
    return this.http.post<Place>(this.apiUrl + "/place/add/" + floorId, {
      nrPlace: placeNumber,
    });
  }

  addFloor(parkingId: string, floorNumber: number) {
    return this.http.post<Floor>(this.apiUrl + "/floor/add/" + parkingId, {
      nrFloor: floorNumber,
    });
  }

  createParking(parking: Parking) {
    return this.http.post<Parking>(this.apiUrl + "/parking/add", parking);
  }

  editPlace(
    placeId: string,
    parkingPlaceStatus: ParkingPlaceStatus
  ): Observable<Place> {
    return this.http.put<Place>(
      this.apiUrl + `/place/edit/${placeId}/${parkingPlaceStatus}`,
      {}
    );
  }
}
