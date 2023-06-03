import { Component, OnDestroy, OnInit } from '@angular/core';
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

  page:any = 0;
  reservas:any;
  ultima!:boolean;

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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
