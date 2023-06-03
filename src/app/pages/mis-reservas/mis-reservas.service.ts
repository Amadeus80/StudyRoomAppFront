import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL= "http://localhost:8080/api/reserva/";

@Injectable({
  providedIn: 'root'
})
export class MisReservasService {

  constructor(private http:HttpClient) { }

  getReservaUsuarios(page:any){
    return this.http.get(`${URL}usuario?page=${page}`);
  }
}
