import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { Parking, Floor } from "../models/parking";

@Directive({
  selector: "[appPlacesCount]",
})
export class PlacesCountDirective implements OnInit {
  @Input("appPlacesCount") parking: Parking;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const placeCount = this.parking.floors.reduce<number>((prev, curr) => {
      return prev + curr.places.length;
    }, 0);
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      placeCount,
    });
  }
}
