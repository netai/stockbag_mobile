import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _userData: User;
  private _loggedIn: boolean = false;

  constructor() { }

  public authenticate(userData: User) {
    this._userData = userData;
    this._loggedIn = true;
    localStorage.setItem('AUTH_TOKEN', userData.token);
    localStorage.setItem('USERNAME', userData.user.username);
  }

  public getUserData(): User {
    return this._userData;
  }

  public getToken(): string {
    return this._userData.token;
  }

  public isLoggedIn(): boolean {
    return this._loggedIn;
  }

}