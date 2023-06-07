import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ComunicadosService } from './comunicados.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/environments/environment';

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

  constructor(private comunicadoService:ComunicadosService){}
  
  ngOnInit(): void {
    this.getComunicados();
  }
  
  getComunicados(){
    this.subscription.add(
      this.comunicadoService.getComunicados().subscribe({
        next:(resp) => {
          this.mensajes = resp;
          this.connect();
        },
        error: (err) => console.log(err)
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
  
  send(){
    let mensaje = {
      "usuario":{
        "username":localStorage.getItem("username")
      },
      "mensaje":"mensaje de prueba"
    }
    this.stompClient.send("/app/send-comunicado", {}, JSON.stringify(mensaje));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
