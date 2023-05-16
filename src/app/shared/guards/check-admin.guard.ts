import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard {

  constructor(private authService:AuthService){}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin.pipe(
      take(1),
      map(admin => admin)
    )
  }
  
}
