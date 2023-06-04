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

  datos:any;
  successMessage:any;
  errorMessage:any;

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
    this.MisDatosService.getDatosUsuarioLogeado().subscribe({
      next:(data) => {
        this.datos = data;
        console.log(this.datos);
      },
      error:(error) => {
        console.log(error)
      }
    })
  }

  onEditUsername(){
    this.resetMessages();
    if((this.formEditUsername.valid)){
      let userData:any = {
        email: this.datos.email,
        username : this.formEditUsername.value.usernameNuevo,
        password : "aaaaaaaaaaaaaaaa",
      }
      this.MisDatosService.editUsername(userData).subscribe({
        next : (resp) => {
          this.datos.username = this.formEditUsername.value.usernameNuevo;
          localStorage.setItem("username", userData.username);
          this.successMessage = "Se ha editado correctamente el username";
          console.log(this.successMessage);
        },
        error : (err) => {
          this.errorMessage = err;
          console.log(this.errorMessage);
        }
      })
      this.closebutton.nativeElement.click();
    }
  }

  onEditPassword(){
    this.resetMessages();
    if((this.formEditPassword.valid)){
      let userData:any = {
        email: this.datos.email,
        username : this.datos.username,
        password : this.formEditPassword.value.passwordNuevo,
      }
      this.MisDatosService.editPassword(userData).subscribe({
        next : (resp) => {
          this.successMessage = "Se ha editado correctamente el password";
          console.log(this.successMessage);
        },
        error : (err) => {
          this.errorMessage = err;
          console.log(this.errorMessage);
        }
      })
      this.closebutton2.nativeElement.click();
    }
  }

  private resetMessages(){
    this.errorMessage = null;
    this.successMessage = null;
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

  // editar(event:Event){
  //   this.resetMessages();
  //   this.usuario = null;
  //   this.changePassword = false;
  //   this.subscription.add(
  //     this.usuarioService.findById(event).subscribe({
  //       next : (resp:any) => {
  //         this.usuario = {
  //           id : resp.id,
  //           email:resp.email,
  //           username:resp.username,
  //           roles:resp.roles,
  //           password: "aaaaaaaa"
  //         }
  //         this.editForm = this.fb.group({
  //           email: [this.usuario.email, [Validators.required, Validators.email]],
  //           username: [this.usuario.username, [Validators.required]],
  //           roles : [this.usuario.roles.map((rol:any) => rol.id), [Validators.required]],
  //           password : [this.usuario.password]
  //         })
  //       },
  //       error : (err) => console.log(err)
  //     })
  //   );
  // }


  // onEdit(){
  //   this.resetMessages();
  //   if((this.editForm.valid)){
  //     let listaRoles = []
  //     for (const rolId of this.editForm.value.roles!) {
  //       listaRoles.push({id: rolId})
  //     }
  //     let userData:any = {
  //       email: this.editForm.value.email,
  //       username : this.editForm.value.username,
  //       password : this.editForm.value.password,
  //       roles : listaRoles
  //     }
  //     if(this.changePassword){
  //       this.usuarioService.editUsuarioConContraseña(userData, this.usuario.id).subscribe({
  //         next : (resp) => {
  //           this.successMessage = "Se ha editado correctamente el usuario";
  //           this.obtenerUsuarios(this.request);
  //         },
  //         error : (err) => {
  //           this.errorMessage = err;
  //         }
  //       })
  //     }
  //     else{
  //       this.usuarioService.editUsuarioSinContraseña(userData, this.usuario.id).subscribe({
  //         next : (resp) => {
  //           this.successMessage = "Se ha editado correctamente el usuario";
  //           this.obtenerUsuarios(this.request);
  //         },
  //         error : (err) => {
  //           this.errorMessage = err;
  //         }
  //       })
  //     }
  //     this.closebutton.nativeElement.click();
  //   }
  // }

  // private resetMessages(){
  //   this.errorMessage = null;
  //   this.successMessage = null;
  // }