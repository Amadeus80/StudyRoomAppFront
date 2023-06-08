import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor{

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;

  constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout en el caso de que desde la api nos llege un cod de estado 401 o 403, también en el caso de que se encuentren estilos de los modales de bootstrap abiertos los eliminamos
                let modal = document.getElementsByClassName("modal-backdrop");
                if(modal.length > 0){
                  modal[0].remove();
                }

                this.authService.logout();
                if(location.href.split("/")[3] != "login"){
                  location.href = "/";
                }
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}
