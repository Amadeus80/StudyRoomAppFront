import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const URL = `${environment.API_URL}/api/user/`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listaUsuarios(request:any){
    return this.http.get(`${URL}lista?page=${request['page']}&size=${request['size']}`, request);
  }

  addUsuario(userData:any){
    return this.http.post(`${URL}add-admin`, userData);
  }

  borrarUsuario(id:any){
    return this.http.delete(`${URL}delete/${id}`);
  }

  findById(id:any){
    return this.http.get(`${URL}${id}`);
  }

  listaRoles(){
    return this.http.get(`${URL}lista-roles`);
  }

  editUsuarioSinContraseña(userData:any, idUsuario:any){
    return this.http.post(`${URL}edit/${idUsuario}`, userData);
  }

  editUsuarioConContraseña(userData:any, idUsuario:any){
    return this.http.post(`${URL}edit-password/${idUsuario}`, userData);
  }
}
