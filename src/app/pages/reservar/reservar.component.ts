import { Component, OnInit, ViewChild} from '@angular/core';
import { ReservarService } from './reservar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

declare var bootstrap:any;
declare var $:any;

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  //Variables
  private subscription: Subscription = new Subscription();
  @ViewChild('closebutton') closebutton:any;
  pipe = new DatePipe('en-US');

  constructor(private reservarService:ReservarService, private fb: FormBuilder) {}

  fechaActual:Date = new Date();
  botonAtrasFechaDisabled:boolean = true;
  botonAdelanteFechaDisabled:boolean = true;
  fechaHoy:string = `${this.fechaActual.getFullYear()}-${('0'+(this.fechaActual.getMonth()+1)).slice(-2)}-${this.fechaActual.getDate()}`;
  fecha:string = `${this.fechaActual.getFullYear()}-${('0'+(this.fechaActual.getMonth()+1)).slice(-2)}-${this.fechaActual.getDate()}`;
  asientos:any[] = [];
  datos:any;
  idAsiento:number = 0;
  nombreAsiento:string = "";
  fechaAsiento:string = "";
  asientosDisponibles: any;
  reservaPk: any;
  cargando:boolean=false;

  formReservar = this.fb.group({
    asiDisp: ['', [Validators.required]]
  });


  ngOnInit(): void{
    this.obtenerReservasDia();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Funciones para reservas asientos
  obtenerReservasDia(){
    this.botonAtrasFechaDisabled = true;
    this.botonAdelanteFechaDisabled = true;
    this.cargando = true;
    this.asientos = [];
    this.subscription.add(
      this.reservarService.listadoAsientos(this.fechaHoy).subscribe(
      {
        next:(data) => {
          this.datos = data;
          let contador = 0;
          let array: any[] = [];
          for (const asiento of this.datos) {
            contador++;
            array.push(asiento);
            if (contador==5) {
              this.asientos.push(array);
              contador = 0;
              array = [];
            }
          }
          this.cargando = false;
          this.botonAtrasFechaDisabled = (this.fechaActual > new Date())? false : true;
          this.botonAdelanteFechaDisabled = false;
          setTimeout(this.iniciarTooltip, 0);
        },
        error:(error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha ocurrido un error. Inténtalo más tarde",
          });
          this.cargando = false;
          this.botonAtrasFechaDisabled = (this.fechaActual > new Date())? false : true;
          this.botonAdelanteFechaDisabled = false;
        }
      })
    )
  }
    
  diaSiguiente(){
    this.fechaActual.setDate(this.fechaActual.getDate() + 1);
    this.botonAtrasFechaDisabled = (this.fechaActual > new Date())? false : true;
    this.fechaHoy = `${this.fechaActual.getFullYear()}-${('0'+(this.fechaActual.getMonth()+1)).slice(-2)}-${this.fechaActual.getDate()}`;
    this.obtenerReservasDia();
  }
  
  diaAnterior(){
    this.fechaActual.setDate(this.fechaActual.getDate() -1);
    this.botonAtrasFechaDisabled = (this.fechaActual > new Date())? false : true;
    this.fechaHoy = `${this.fechaActual.getFullYear()}-${('0'+(this.fechaActual.getMonth()+1)).slice(-2)}-${this.fechaActual.getDate()}`;
    this.obtenerReservasDia();
  }

  reservar(){
    if((this.formReservar.valid)){
      this.cargando = true;
      this.reservaPk = {"reservaPK": {
        "asiento": {
          "id": this.idAsiento
        },
        "horario": {
          "id": this.formReservar.value.asiDisp
        },
        "fecha": this.fechaActual
      }}
      this.subscription.add(
        this.reservarService.reservar(this.reservaPk).subscribe(
        {
          next:(data) => {
            this.resetearInputHora();
            Swal.fire({
              icon: 'success',
              title: 'Se ha reservado el asiento correctamente!',
              showConfirmButton: true,
            });
            this.cargando = false;
          },
          error:(error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
            this.cargando = false;
          }
        })
      )
      this.closebutton.nativeElement.click();
    }
  }

  actualizarDatos(id:number, nombreAsiento:string){ 
    this.idAsiento = id;
    this.nombreAsiento = nombreAsiento;
    this.fechaAsiento = this.fechaHoy;
    this.cargando = true;
    this.subscription.add(
      this.reservarService.asientosDisponibles(this.fechaAsiento, this.idAsiento).subscribe(
      {
        next:(data) => {
          this.asientosDisponibles = data;
          this.cargando = false;
        },
        error:(error) => {
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

  resetearInputHora(){
    this.formReservar = this.fb.group({
      asiDisp: ['', [Validators.required]]
    });
  }

  iniciarTooltip(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }


}