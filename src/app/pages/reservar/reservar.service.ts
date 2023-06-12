import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

export const URL= `${environment.API_URL}/api/reserva/`;

@Injectable({
  providedIn: 'root'
})
export class ReservarService {

  constructor(private http:HttpClient) { }

  //Llamadas a la Api
  listadoAsientos(fecha:string){
    return this.http.get(`${URL}${fecha}`);
  }

  asientosDisponibles(fecha:string, idAsiento:number){
    return this.http.get(`${environment.API_URL}/api/horario/horas-disponibles/${fecha}/${idAsiento}`);
  }

  reservar(reservaPK: any){
    return this.http.post(`${URL}add`, reservaPK);
  }

}
