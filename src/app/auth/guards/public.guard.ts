import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuth) => {
        if (isAuth) {
          this.router.navigate(['/']);
        }
      }),
      map((isAuth) => !isAuth)
    );
  }
  public canMatch: CanMatchFn = (route, segments) => {
    return this.checkAuthStatus();
  };

  public canActivate: CanActivateFn = (route, state) => {
    return this.checkAuthStatus();
  };
}
