import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ComunicadosService } from './comunicados.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.css']
})
export class ComunicadosComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton:any;
  webSocketEndPoint: string = `${environment.API_URL}/comunicados`;
  topic: string = "/topic/comunicados";
  stompClient: any;
  mensajes:any = [];
  private subscription: Subscription = new Subscription();
  cargando:boolean=false;
  idComunicado:any;
  isAdmin:boolean=false;

  constructor(private comunicadoService:ComunicadosService, private authService:AuthService){}
  
  ngOnInit(): void {
    this.getComunicados();
    this.subscription.add(
      this.authService.isAdmin.subscribe((resp) => (this.isAdmin = resp))
    );
  }
  
  getComunicados(){
    this.cargando = true;
    this.subscription.add(
      this.comunicadoService.getComunicados().subscribe({
        next:(resp) => {
          this.mensajes = resp;
          this.connect();
          this.cargando = false;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha ocurrido un error. Inténtalo más tarde",
          });
          this.cargando = false;
        }
      })
    );
  }
  
  connect(){
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame:any) {
      _this.stompClient.subscribe(_this.topic, function (data:any) {
        _this.mensajes.push(JSON.parse(data.body))
      });

      _this.stompClient.subscribe("/topic/comunicados-delete", function (data:any) {
        let datos = JSON.parse(data.body);
        _this.mensajes = _this.mensajes.filter((mensaje:any) => mensaje.id != datos.id);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  delete(id:any){
    this.idComunicado = id;
  }

  deleteComunicado(){
    this.stompClient.send(`/app/delete-comunicado/${this.idComunicado}`, {});
    this.closebutton.nativeElement.click();
  }
  
  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }
  
  errorCallBack(error:any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
