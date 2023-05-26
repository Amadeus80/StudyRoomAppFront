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

  borrarUsuario(id:any){
    return this.http.delete(`${URL}delete/${id}`);
  }

  findById(id:any){
    return this.http.get(`${URL}${id}`);
  }

  listaRoles(){
    return this.http.get(`${URL}lista-roles`);
  }
}
