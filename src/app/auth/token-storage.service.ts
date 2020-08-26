import { Injectable } from "@angular/core";

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAuthorities";
const ID_KEY = "userId";
const PARKING_ID = "parkingId";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() {}

  ignOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveParking(parking: string) {
    window.sessionStorage.removeItem(PARKING_ID);
    window.sessionStorage.setItem(PARKING_ID, parking);
  }

  public clearParking() {
    window.sessionStorage.clear();
  }

  public clearUsername() {
    window.sessionStorage.clear();
  }

  public getParking(): string {
    return sessionStorage.getItem(PARKING_ID);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(
        (authority) => {
          this.roles.push(authority.authority);
        }
      );
    }

    return this.roles;
  }

  public saveId(id: number) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id + "");
  }

  public getId(): string {
    return sessionStorage.getItem(ID_KEY);
  }
}
