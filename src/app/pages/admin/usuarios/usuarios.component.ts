import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { MatPaginatorIntl,PageEvent } from '@angular/material/paginator';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('closebutton') closebutton:any;

  usuarios: any = [];
  totalElementos:number = 0;
  request:any = {page:"0", size:"5"}
  usuario:any = {};
  roles:any = [];
  changePassword:boolean = false;
  myModal:any;
  successMessage:any;
  errorMessage:any;

  editForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    roles : [[""], [Validators.required]],
    password : ['']
  })

  constructor(private usuarioService: UsuarioService, private paginator : MatPaginatorIntl, private fb:FormBuilder) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }

  ngOnInit(): void {
    this.obtenerUsuarios(this.request);
    this.validaciones();
    this.subscription.add(
      this.usuarioService.listaRoles().subscribe({
        next : (resp:any) => {
          this.roles = resp;
        },
        error : (err) => console.log(err)
      })
    );
  }

  private obtenerUsuarios(request:any){
    this.subscription.add(
      this.usuarioService.listaUsuarios(request).subscribe({
        next: (resp:any) => {
          this.usuarios = resp.content;
          this.totalElementos = resp.totalElements;
        },
        error: (err) => console.log(err),
      })
    );
  }

  nextPage(event: PageEvent){
    this.request['page'] = event.pageIndex.toString();
    this.request['size'] = event.pageSize.toString();
    this.obtenerUsuarios(this.request);
  }

  nuevo(){
    this.usuario = {};
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      roles : [[""], [Validators.required]],
      password : ['']
    })
  }

  addNuevo(){
    if(this.editForm.valid){
      let listaRoles = []
      for (const rolId of this.editForm.value.roles!) {
        listaRoles.push({id: rolId})
      }
      let userData:any = {
        email: this.editForm.value.email,
        username : this.editForm.value.username,
        password : this.editForm.value.password,
        roles : listaRoles
      }
      this.usuarioService.addUsuario(userData).subscribe({
        next : (resp) => {
          this.successMessage = "Se ha añadido correctamente el usuario";
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err;
        }
      });
      this.closebutton.nativeElement.click();
    }
  }

  borrar(event:Event){
    this.subscription.add(
      this.usuarioService.borrarUsuario(event).subscribe({
        next: (resp) => {
          this.obtenerUsuarios(this.request);
        },
        error : (err) => console.log(err)
      })
    )
  }

  editar(event:Event){
    this.usuario = null;
    this.changePassword = false;
    this.subscription.add(
      this.usuarioService.findById(event).subscribe({
        next : (resp:any) => {
          this.usuario = {
            id : resp.id,
            email:resp.email,
            username:resp.username,
            roles:resp.roles,
            password: "aaaaaaaa"
          }
          this.editForm = this.fb.group({
            email: [this.usuario.email, [Validators.required, Validators.email]],
            username: [this.usuario.username, [Validators.required]],
            roles : [this.usuario.roles.map((rol:any) => rol.id), [Validators.required]],
            password : [this.usuario.password]
          })
        },
        error : (err) => console.log(err)
      })
    );
  }

  showPassword(){
    this.changePassword = !this.changePassword;
    if(this.changePassword){
      this.editForm = this.fb.group({
        email: [this.usuario.email, [Validators.required, Validators.email]],
        username: [this.usuario.username, [Validators.required]],
        roles : [this.usuario.roles.map((rol:any) => rol.id), [Validators.required]],
        password : ['', [Validators.required, Validators.minLength(8)]]
      })
    }
    else{
      this.editForm = this.fb.group({
        email: [this.usuario.email, [Validators.required, Validators.email]],
        username: [this.usuario.username, [Validators.required]],
        roles : [this.usuario.roles.map((rol:any) => rol.id), [Validators.required]],
        password : ['aaaaaaaa', [Validators.required, Validators.minLength(8)]]
      })
    }
  }

  onEdit(){
    if((this.editForm.valid)){
      console.log(this.editForm.value)
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
