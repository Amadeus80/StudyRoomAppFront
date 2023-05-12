import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard {
  constructor(private authService: AuthService){}
  canActivate(): Observable<boolean> {
    this.authService.checkToken();
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged:boolean) => isLogged)
    );
  }
  
}
