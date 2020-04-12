import { Injectable } from '@angular/core';
import {CanLoad, Route, UrlSegment, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private router: Router) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    return this.checkLogin();
  }
  async checkLogin(): Promise<boolean> {
    console.log(localStorage.getItem('user'));
    if (!localStorage.getItem('user')) {
      return true;
    }
    await this.router.navigate(['/portal/home']);
  }
}
