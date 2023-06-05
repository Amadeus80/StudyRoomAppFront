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

  asientosDisponibles(fecha:string, idAsiento:number){
    return this.http.get(`${environment.API_URL}/api/horario/horas-disponibles/${fecha}/${idAsiento}`);
  }

  reservar(reservaPK: any){
    return this.http.post(`${environment.API_URL}/api/reserva/add`, reservaPK);
  }

}
