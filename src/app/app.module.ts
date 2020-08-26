import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContextMenuModule } from "@progress/kendo-angular-menu";
import { FilterPipe } from "./filter.pipe";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { httpInterceptorProviders } from "./auth/auth-interceptor";
import { RouteAuthService } from "./services/route-auth.service";

import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
} from "@nebular/theme";
import { ParkingComponent } from "./parking/parking.component";
import { CommonModule } from "@angular/common";
import { MenuModule } from "@progress/kendo-angular-menu";
import { AuthService } from "./auth/auth.service";
import { ParkingSelectionComponent } from "./parking-selection/parking-selection.component";
import { PlacesCountDirective } from "./parking-selection/places-count.directive";

const providers = [...NbDialogModule.forRoot().providers];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterPipe,
    RegisterComponent,
    LoginComponent,
    ParkingComponent,
    ParkingSelectionComponent,
    PlacesCountDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ContextMenuModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    MenuModule,
    BrowserAnimationsModule,
  ],
  providers: [
    httpInterceptorProviders,
    RouteAuthService,
    NbDialogService,
    providers,
  ],
  bootstrap: [AppComponent],
  exports: [FilterPipe],
})
export class AppModule {}
