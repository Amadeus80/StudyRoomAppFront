import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ContactService } from './contact.service';
import { FormBuilder, Validators } from '@angular/forms';
import { contact } from 'src/app/shared/models/contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  successMessage: any = null; 
  errorLogin: boolean = false;
  errorMessage!:string;
  private subscription: Subscription = new Subscription();
  isLogged = false;

  contactForm = this.fb.group({
    nombreUsuario: ['', [Validators.required]],
    email: ['', [Validators.required,  Validators.email]],
    telefono: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  });
  
  constructor(public authService: AuthService, public contactService: ContactService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.validaciones();
    this.subscription.add(
      this.authService.isLogged.subscribe((resp) => (this.isLogged = resp))
    );
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

  onContact(): void {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      const authData: contact = {
        nombreUsuario: formValue.nombreUsuario!,
        email: formValue.email!,
        telefono: formValue.telefono!,
        mensaje: formValue.mensaje!
      };
      this.subscription.add(
        this.contactService.enviarConsulta(authData).subscribe({
          next: (resp) => {
            if (resp) {
              this.contactForm.reset();
              document.getElementById("contactForm")?.classList.remove("ng-touched");
              document.getElementById("contactForm")?.classList.remove("was-validated");
              this.successMessage = "Consulta enviada con éxito!!";
            }
          },
          error: (e) => {
            this.errorLogin = true;
            this.errorMessage = e;
          },
        })
      );
    }
  }  

}
