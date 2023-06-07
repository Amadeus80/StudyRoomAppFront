import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

export const URL= `${environment.API_URL}/api/contacto/`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  enviarConsulta(datos: any){
    return this.http.post(`${URL}add`, datos);
  }

}
