import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const URL = `${environment.API_URL}/api/contacto/`;

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http:HttpClient) { }

  getConsultasNoResueltas(){
    return this.http.get(`${URL}lista-no-resueltas`);
  }

  resolverConsulta(id:string, data:any){
    return this.http.post(`${URL}resolver/${id}`, data);
  }
}
