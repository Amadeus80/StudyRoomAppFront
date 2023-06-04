import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL= "http://localhost:8080/api/user/";

@Injectable({
  providedIn: 'root'
})
export class MisDatosService {

  constructor(private http:HttpClient) { }

  getDatosUsuarioLogeado(){
    return this.http.get(`${URL}find-user-logeado`);
  }

  editUsername(userData:any){
    return this.http.put(`${URL}editUsernameUsuario`, userData);
  }

  editPassword(userData:any){
    return this.http.put(`${URL}editPasswordUsuario`, userData);
  }

}
