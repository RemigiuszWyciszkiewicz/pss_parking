export interface Parking {
  id: any;
  street: string;
  city: string;
  closed: boolean;
  floors: Floor[];
  open: boolean;
}

export interface Floor {
  id: any;
  nrFloor: number;
  places: Place[];
}

export interface Place {
  id: any;
  nrPlace: number;
  free: boolean;
  confirmed: boolean;
}
