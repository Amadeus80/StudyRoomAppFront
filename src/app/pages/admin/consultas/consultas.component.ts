import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsultaService } from './consulta.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  consultas:any;
  errorMessage:any;
  successMessage:any;

  constructor(private consultaService: ConsultaService){

  }

  ngOnInit(): void {
    this.obtenerConsultas();
  }

  obtenerConsultas(){
    this.subscription.add(
      this.consultaService.getConsultasNoResueltas().subscribe({
        next : (resp) => this.consultas = resp,
        error : (err) => this.errorMessage = err
      })
    )
  }

  responder(id:string){
    this.resetInfoMessages();
    let respuesta:any = document.getElementById(id);
    if(respuesta.value.length <= 5){
      this.errorMessage = "Indica más de 5 caracteres en la respuesta";
    }
    else{
      respuesta = {"mensaje" : respuesta.value};
      this.subscription.add(
        this.consultaService.resolverConsulta(id, respuesta).subscribe({
          next : (resp) => {
            this.obtenerConsultas();
            this.successMessage = "Se ha resuelto la consulta";
          },
          error : (err) => this.errorMessage = err
        })
      );
    }
  }

  resetInfoMessages(){
    this.errorMessage = null;
    this.successMessage = null;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
