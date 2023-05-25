import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

export const URL= "http://localhost:8080/api/reserva/";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  enviarConsulta(datos: any){
    return this.http.post(`${environment.API_URL}/api/contacto/add`, datos);
  }

}
