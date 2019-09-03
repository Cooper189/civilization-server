import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginInGuard implements CanLoad  {
  constructor(private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (sessionStorage.getItem('id')) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
