import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    req.headers.append("Authorization", `Bearer ${token}`)
    const apiReq = req.clone({
      setHeaders : {
        'Content-Type': "application/json",
        authorization: `Bearer ${ token }`
      }
    });
    console.log(apiReq)
    return next.handle(apiReq);
  }
}
