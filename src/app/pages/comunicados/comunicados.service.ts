import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const URL= `${environment.API_URL}/api/comunicados/`;

@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {

  constructor(private http:HttpClient) { }

  getComunicados(){
    return this.http.get(`${URL}lista`);
  }
}
