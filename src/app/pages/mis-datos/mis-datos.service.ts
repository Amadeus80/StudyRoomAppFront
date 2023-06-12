import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const URL= `${environment.API_URL}/api/user/`;

@Injectable({
  providedIn: 'root'
})
export class MisDatosService {

  constructor(private http:HttpClient) { }

  //Llamadas a la Api

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
