import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard {

  constructor(private authService: AuthService){}
  canActivate(): Observable<boolean> {
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged:boolean) => !isLogged)
    );
  }
}
