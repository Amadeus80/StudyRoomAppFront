import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsultaService } from './consulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  cargando:boolean = false;

  consultas:any;

  constructor(private consultaService: ConsultaService){

  }

  ngOnInit(): void {
    this.obtenerConsultas();
  }

  obtenerConsultas(){
    this.cargando = true;
    this.subscription.add(
      this.consultaService.getConsultasNoResueltas().subscribe({
        next : (resp) => {
          this.consultas = resp;
          this.cargando = false;
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha ocurrido un error. Inténtalo más tarde",
          });
          this.cargando = false;
        }
      })
    )
  }

  responder(id:string){
    let respuesta:any = document.getElementById(id);
    if(respuesta.value.length <= 5){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Indica más de 5 caracteres en la respuesta",
      })
    }
    else{
      respuesta = {"mensaje" : respuesta.value};
      this.cargando = true;
      this.subscription.add(
        this.consultaService.resolverConsulta(id, respuesta).subscribe({
          next : (resp) => {
            this.obtenerConsultas();
            Swal.fire({
              icon: 'success',
              title: 'Se ha resuelto la consulta!',
              showConfirmButton: true,
            })
          },
          error : (err) =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            })
            this.cargando = false;
          }
        })
      );
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
