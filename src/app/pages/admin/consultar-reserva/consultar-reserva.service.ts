import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const URL = `${environment.API_URL}/api/reserva/`;

@Injectable({
  providedIn: 'root'
})
export class ConsultarReservaService {

  constructor(private http:HttpClient) { }

  consultar(claveReserva:any){
    return this.http.post(`${URL}find`, claveReserva);
  }

  obtenerAsientos(){
    return this.http.get(`${environment.API_URL}/api/asiento/lista`);
  }

  obtenerHorarios(){
    return this.http.get(`${environment.API_URL}/api/horario/lista`);
  }

  obtenerAsiento(asiento:string){
    return this.http.get(`${environment.API_URL}/api/asiento/find/${asiento}`);
  }

  obtenerHorario(hora:string){
    return this.http.get(`${environment.API_URL}/api/horario/hora/${hora}`);
  }
}
