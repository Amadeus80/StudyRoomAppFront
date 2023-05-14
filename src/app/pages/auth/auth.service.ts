import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, map, throwError} from "rxjs";
import { Authority, User, UserResponse } from 'src/app/shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const allowUrl:String[] = ["/"];

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router:Router) { 
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

  lista(){
    /* const tokenLocalStorage:string = this.token!;
    const opciones = { 
      headers : new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization' : `Bearer ${tokenLocalStorage}`
      })
    }
    console.log(tokenLocalStorage); */
    return this.http.get(`${environment.API_URL}/api/user/lista`)
    .pipe(
      map(resp => resp)
    );
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get roles(){
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
      catchError((err) => this.handlerError(err))
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
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  private saveToken(token:string):void{
    localStorage.setItem("token", token);
  }

  private saveUser(user:string):void{
    localStorage.setItem("username", user);
  }

  private saveAuthorities(authorities:Authority[]):void{
    const authoritiesJSON:string = JSON.stringify(authorities.map(rol => rol.authority));
    localStorage.setItem("authorities", authoritiesJSON);
  }

  private handlerError(error:any):Observable<never>{
    let errorMessage = "Ha ocurrido un error";
    if(error){
      errorMessage = `Error: code ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
