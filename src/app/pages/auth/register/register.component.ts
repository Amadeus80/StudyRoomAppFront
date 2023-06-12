import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/shared/models/user.interface';
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  //Variables
  private subscription: Subscription = new Subscription();
  cargando:boolean=false;

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username:['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private authService:AuthService, private fb:FormBuilder, private router:Router, private snackBar: MatSnackBar){}
  
  ngOnInit(): void {
    this.validaciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Registrarse
  onRegister():void{
    if (this.registerForm.valid) {
      this.cargando = true;
      const formValue = this.registerForm.value;
      const registerData:UserCreate = {
        email : formValue.email!,
        username : formValue.username!,
        password:formValue.password!
      }
      this.subscription.add(
        this.authService.register(registerData).subscribe({
          next: (resp) => {
            localStorage.setItem("successRegister", "Te has registrado correctamente!");
            this.cargando = false;
            this.router.navigate(["/login"])
          },
          error : (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e,
            })
            this.cargando = false;
          }
        })
      )
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
