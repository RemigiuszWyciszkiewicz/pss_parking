import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SignUpInfo } from "./signup-info";
import { Observable, Subject, BehaviorSubject } from "rxjs";

import { AuthLoginInfo } from "./login-info";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl = "http://54.93.238.30/login";
  private signupUrl = "http://54.93.238.30/user/register";

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public getLoggedStatus = this.isLoggedIn.asObservable();

  isAdmin = false;

  constructor(private httpClient: HttpClient) {}

  signUp(info: SignUpInfo): Observable<object> {
    return this.httpClient.post<object>(this.signupUrl, info, {
      headers: { "Content-Type": "application/json" },
    });
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.httpClient.post<any>(this.loginUrl, credentials, {
      headers: { "Content-Type": "application/json" },
      observe: "response",
    });
  }

  changeLoginStatus(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }
}
