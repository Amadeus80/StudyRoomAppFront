import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ComunicadosService } from './comunicados.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.css']
})
export class ComunicadosComponent implements OnInit, OnDestroy {
  webSocketEndPoint: string = `${environment.API_URL}/comunicados`;
  topic: string = "/topic/comunicados";
  stompClient: any;
  mensajes:any = [];
  private subscription: Subscription = new Subscription();
  cargando:boolean=false;

  constructor(private comunicadoService:ComunicadosService){}
  
  ngOnInit(): void {
    this.getComunicados();
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
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
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
