import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenExpiredGuard {

  constructor(private authService:AuthService){}

  canActivate(): Observable<boolean> {
    return this.authService.isExpired.pipe(
      take(1),
      map((expired:boolean) => {
        if(expired){
          this.authService.logout()
        }
        return !expired
      })
    )
  }
  
}
