import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsultarReservaService } from './consultar-reserva.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css'],
})
export class ConsultarReservaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  cargando: boolean = false;
  reservaPk: any;
  asientos: any;
  horarios: any;

  consultaForm = this.fb.group({
    asiento: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  constructor(
    private consultarReservaService: ConsultarReservaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.obtenerAsientos();
    this.obtenerHorarios();
  }

  obtenerAsientos(){
    this.consultarReservaService.obtenerAsientos().subscribe({
      next : (resp) => {
        this.asientos = resp;
        this.cargando = false;
      },
      error : (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      }
    });
  }

  obtenerHorarios(){
    this.consultarReservaService.obtenerHorarios().subscribe({
      next : (resp) => {
        this.horarios = resp;
        this.cargando = false;
      },
      error : (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  send() {
    if (this.consultaForm.valid) {
      this.cargando = true;
      this.reservaPk = {
          asiento: {
            id: this.consultaForm.value.asiento,
          },
          horario: {
            id: this.consultaForm.value.horario,
          },
          fecha: this.consultaForm.value.fecha,
      };
      console.log(this.reservaPk);
      this.subscription.add(
        this.consultarReservaService.consultar(this.reservaPk).subscribe({
          next : (resp:any) => {
            console.log(resp);
            Swal.fire({
              icon: 'success',
              title: 'Reserva encontrada',
              text: `La reserva especificada pertenece a ${resp.usuario.email}`,
            });
            this.cargando = false;
          },
          error : (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "No se ha encontrado ninguna reserva con los datos especificados",
            });
            this.cargando = false;
          }
        })
      );
    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Completa todos los campos',
        text: "Se tienen que indicar los tres campos para comprobar si existe una reserva",
      });
    }
  }
}
