import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, map, throwError} from "rxjs";
import { Authority, User, UserResponse } from 'src/app/shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/shared/models/user.interface';

const allowUrl:String[] = ["/"];

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Variables
  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);
  private expired = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router:Router) { 
    this.comprobarAdmin() ? this.admin.next(true) : this.admin.next(false);

    if(!allowUrl.find(url => url == this.router.url)){
      this.checkToken();
    }
    else{
      if(localStorage.getItem("token") && localStorage.getItem("authorities") && localStorage.getItem("username")){
        this.loggedIn.next(true);
      }
      else{
        localStorage.removeItem("token");
        localStorage.removeItem("authorities");
        localStorage.removeItem("username");
      }
    }
  }

  //Diferentes llamadas a la Api
  lista(){
    return this.http.get(`${environment.API_URL}/api/user/lista`)
    .pipe(
      map(resp => resp)
    );
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  comprobarAdmin():boolean{
    let admin = false;
    if(this.rolesLocalStorage){
      const roles:string[] = JSON.parse(this.rolesLocalStorage);
      roles.forEach(rol => {
        if(rol == "ROLE_ADMIN"){
          admin = true;
        }
      })
    }
    return admin;
  }

  get isAdmin():Observable<boolean>{
    return this.admin.asObservable();
  }

  get isExpired():Observable<boolean>{
    if(this.tokenIsExpired(this.token)){
      this.expired.next(true);
    }
    else{
      this.expired.next(false);
    }
    return this.expired.asObservable();
  }

  get rolesLocalStorage(){
    return localStorage.getItem("authorities");
  }

  get username(){
    return localStorage.getItem("username");
  }

  get token(){
    return localStorage.getItem("token");
  }

  login(authData:User):Observable<UserResponse | void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/api/login`, authData)
    .pipe(
      map((resp:UserResponse) => {
        console.log(resp);
        this.saveToken(resp.token);
        this.saveAuthorities(resp.user.authorities);
        this.saveUser(resp.user.username);
        this.loggedIn.next(true);
        return resp;
      }),
      catchError((err) => throwError(() => err))
    )
  }

  register(registerData:UserCreate):Observable<UserCreate | void>{
    return this.http
    .post<UserCreate>(`${environment.API_URL}/api/user/add`, registerData)
    .pipe(
      map((resp:UserCreate) => {
        console.log(resp)
      }),
      catchError((err) => throwError(() => err))
    )
  }

  logout():void{
    localStorage.removeItem("token");
    localStorage.removeItem("authorities");
    localStorage.removeItem("username")
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  checkToken():void{
    const userToken = localStorage.getItem("token");
    const isExpired = this.tokenIsExpired(userToken!);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  tokenIsExpired(token:string | null):boolean{
    return (token) ? helper.isTokenExpired(token) : true;
  }

  private saveToken(token:string):void{
    localStorage.setItem("token", token);
  }

  private saveUser(user:string):void{
    localStorage.setItem("username", user);
  }

  private saveAuthorities(authorities:Authority[]):void{
    const authoritiesUser = authorities.map(rol => rol.authority);
    const authoritiesJSON:string = JSON.stringify(authoritiesUser);
    localStorage.setItem("authorities", authoritiesJSON);
    this.comprobarAdmin() ? this.admin.next(true) : this.admin.next(false);
  }

}
