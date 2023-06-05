import { Component, OnInit, ViewChild} from '@angular/core';
import { ReservarService } from './reservar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @ViewChild('closebutton') closebutton:any;
  pipe = new DatePipe('en-US');

  constructor(private reservarService:ReservarService, private fb: FormBuilder) {}

  fechaActual:Date = new Date();
  botonAtrasFechaDisabled:boolean = true;
  fechaHoy:string = `${this.fechaActual.getFullYear()}-${('0'+(this.fechaActual.getMonth()+1)).slice(-2)}-${this.fechaActual.getDate()}`;
  asientos:any[] = [];
  datos:any;
  idAsiento:number = 0;
  nombreAsiento:string = "";
  fechaAsiento:string = "";
  asientosDisponibles: any;
  reservaPk: any;
  successMessage:any;
  errorMessage:any;

  formReservar = this.fb.group({
    asiDisp: ['', [Validators.required]]
  });


  ngOnInit(): void{
    this.obtenerReservasDia();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerReservasDia(){
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
        },
        error:(error) => {
          console.log(error)
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
    this.resetMessages();
    if((this.formReservar.valid)){
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
            this.successMessage = `Se ha reservado el asiento ${this.nombreAsiento} correctamente`;
          },
          error:(error) => {
            this.errorMessage = error;
            console.log(this.errorMessage);
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
    this.subscription.add(
      this.reservarService.asientosDisponibles(this.fechaAsiento, this.idAsiento).subscribe(
      {
        next:(data) => {
          this.asientosDisponibles = data;
        },
        error:(error) => {
          console.log(error)
        }
      })
    )
  }

  private resetMessages(){
    this.errorMessage = null;
    this.successMessage = null;
  }

}