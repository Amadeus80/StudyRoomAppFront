import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

export const URL= "http://localhost:8080/api/reserva/";

@Injectable({
  providedIn: 'root'
})
export class ReservarService {

  constructor(private http:HttpClient) { }

  listadoAsientos(fecha:string){
    return this.http.get(`${environment.API_URL}/api/reserva/`+fecha);
  }

}
