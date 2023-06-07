import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const URL= `${environment.API_URL}/api/reserva/`;

@Injectable({
  providedIn: 'root'
})
export class MisReservasService {

  constructor(private http:HttpClient) { }

  getReservaUsuarios(page:any){
    return this.http.get(`${URL}usuario?page=${page}`);
  }

  delete(claveReserva:any){
    return this.http.delete(`${URL}delete`, {body: claveReserva});
  }
}
