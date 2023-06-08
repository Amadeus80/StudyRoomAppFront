import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MisDatosService } from './mis-datos.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;
  cargando:boolean = false;

  datos:any;

  formEditUsername = this.fb.group({
    usernameNuevo: ['', [Validators.required]]
  })

  formEditPassword = this.fb.group({
    passwordNuevo: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(private MisDatosService:MisDatosService,  private fb: FormBuilder){}

  ngOnInit(): void {
    this.datos = [];
    this.obtenerDatos();
    this.validaciones();
  }

  obtenerDatos(){
    this.cargando = true;
    this.subscription.add(
      this.MisDatosService.getDatosUsuarioLogeado().subscribe({
        next:(data) => {
          this.datos = data;
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

  onEditUsername(){
    if((this.formEditUsername.valid)){
      this.cargando = true;
      let userData:any = {
        email: this.datos.email,
        username : this.formEditUsername.value.usernameNuevo,
        password : "aaaaaaaaaaaaaaaa",
      }
      this.subscription.add(
        this.MisDatosService.editUsername(userData).subscribe({
          next : (resp) => {
            this.datos.username = this.formEditUsername.value.usernameNuevo;
            localStorage.setItem("username", userData.username);
            Swal.fire({
              icon: 'success',
              title: 'Se ha editado correctamente el username!',
              showConfirmButton: true,
            })
            this.cargando = false;
          },
          error : (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            });
            this.cargando = false;
          }
        })
      )
      this.closebutton.nativeElement.click();
    }
  }

  onEditPassword(){
    if((this.formEditPassword.valid)){
      this.cargando = true;
      let userData:any = {
        email: this.datos.email,
        username : this.datos.username,
        password : this.formEditPassword.value.passwordNuevo,
      }
      this.subscription.add(
        this.MisDatosService.editPassword(userData).subscribe({
          next : (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Se ha editado correctamente el password!',
              showConfirmButton: true,
            })
            this.cargando = false;
          },
          error : (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            });
            this.cargando = false;
          }
        })
      )
      this.closebutton2.nativeElement.click();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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