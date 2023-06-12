import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  //Variables
  private subscription: Subscription = new Subscription();
  cargando:boolean = false;
  successRegister:any=null;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem("successRegister")){
      this.successRegister = localStorage.getItem("successRegister");
      Swal.fire({
        icon: 'success',
        title: this.successRegister,
        showConfirmButton: true,
      })
      localStorage.removeItem("successRegister");
      this.successRegister = null;
    }
    this.validaciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Iniciar Sesión
  onLogin(): void {
    if (this.loginForm.valid) {
      this.cargando = true;
      const formValue = this.loginForm.value;
      const authData: User = {
        email: formValue.email!,
        password: formValue.password!,
      };
      this.subscription.add(
        this.authService.login(authData).subscribe({
          next: (resp) => {
            if (resp) {
              localStorage.setItem("success", "Has iniciado sesión con éxito!");
              this.cargando = false;
              this.router.navigate(['']);
            }
          },
          error: (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e,
            });
            this.cargando = false;
          },
        })
      );
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
