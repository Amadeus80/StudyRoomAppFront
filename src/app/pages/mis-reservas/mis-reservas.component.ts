import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MisReservasService } from './mis-reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('closebutton') closebutton:any;

  page:any = 0;
  reservas:any;
  ultima!:boolean;
  claveReserva:any;

  constructor(private misReservasService:MisReservasService){}

  ngOnInit(): void {
    this.reservas = [];
    this.obtenerReservas();
  }

  obtenerReservas(){
    this.subscription.add(
      this.misReservasService.getReservaUsuarios(this.page).subscribe({
        next : (resp:any) => {
          resp.content.forEach((reserva:any) => {
            this.reservas.push(reserva);
          });
          this.ultima = resp.last
          console.log()
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error',
          })
        }
      })
    )
  }

  cargarMas(){
    this.page++;
    this.obtenerReservas();
  }

  obtenerClaveReserva(aisentoId:any, horarioId:any, fecha:any){
    this.claveReserva = {
      "asiento" : {"id":aisentoId},
      "horario":{"id":horarioId},
      "fecha":fecha
    }
  }

  deleteReserva(){
    this.subscription.add(
      this.misReservasService.delete(this.claveReserva).subscribe({
        next : (resp) => {
          this.closebutton.nativeElement.click();
          this.page = 0;
          this.reservas = [];
          this.obtenerReservas();
          Swal.fire({
            icon: 'success',
            title: 'Se ha cancelado la reserva con éxito',
            showConfirmButton: true,
          })
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
        }
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
