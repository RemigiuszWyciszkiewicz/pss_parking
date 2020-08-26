import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { RouteAuthService } from "./services/route-auth.service";
import { ParkingComponent } from "./parking/parking.component";
import { ParkingResolve } from "./services/parking.resolver";
import { ParkingSelectionComponent } from "./parking-selection/parking-selection.component";

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "parkingSelection", component: ParkingSelectionComponent },
  {
    path: "parking",
    component: ParkingComponent,
    resolve: { parking: ParkingResolve },
  },

  { path: "", redirectTo: "/login", pathMatch: "full" },
];
@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [ParkingResolve],
})
export class AppRoutingModule {}
