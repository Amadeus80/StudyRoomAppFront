import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor{

  constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                this.authService.logout();
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}
