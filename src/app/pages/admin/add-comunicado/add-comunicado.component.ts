import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-comunicado',
  templateUrl: './add-comunicado.component.html',
  styleUrls: ['./add-comunicado.component.css']
})
export class AddComunicadoComponent implements OnInit{

  //Variables
  webSocketEndPoint: string = `${environment.API_URL}/comunicados`;
  topic: string = "/topic/comunicados";
  stompClient: any;

  comunicadoForm = this.fb.group({
    comunicado: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(254)]]
  });

  constructor(private fb:FormBuilder){}
  
  ngOnInit(): void {
    this.validaciones();
    this.connect();
  }
  
  //Conexión y desconexión con el web socket 
  connect(){
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame:any) {
    }, this.errorCallBack);
  }
  
  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }
  
  //Error en el servidor
  errorCallBack(error:any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
  
  //Enviar el comunicado
  send(){
    if(this.comunicadoForm.valid){
      let mensaje = {
        "usuario":{
          "username":localStorage.getItem("username")
        },
        "mensaje":this.comunicadoForm.value.comunicado
      }
      this.stompClient.send("/app/send-comunicado", {}, JSON.stringify(mensaje));
      Swal.fire({
        icon: 'success',
        title: 'Se ha enviado el comunicado',
      })
      this.comunicadoForm.reset();
      setTimeout(function(){
        document.getElementById("formComunicado")?.classList.remove("ng-touched");
        document.getElementById("formComunicado")?.classList.remove("was-validated");
      }, 0);
    }
  }

  validaciones(): void {
    // Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
    (function () {
      'use strict'
      // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
      var forms = document.querySelectorAll('.needs-validation')

      // Bucle sobre ellos y evitar el envío
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
  }
}
