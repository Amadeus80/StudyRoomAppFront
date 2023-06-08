import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { MatPaginator, MatPaginatorIntl,PageEvent } from '@angular/material/paginator';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebutton2') closebutton2:any;
  @ViewChild('paginator') paginador: any;

  usuarios: any = [];
  totalElementos:number = 0;
  request:any = {page:"0", size:"5"}
  usuario:any = {};
  roles:any = [];
  changePassword:boolean = false;
  myModal:any;
  query:any;
  busquedaFiltro:boolean=false;
  usuarioIdDelete:any;
  cargando:boolean = false;

  editForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    roles : [[""], [Validators.required]],
    password : ['', [Validators.required, Validators.minLength(8)]],
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
    this.cargando = true;
    if(this.busquedaFiltro){
      this.subscription.add(
        this.usuarioService.listaUsuariosFiltro(request, this.query).subscribe({
          next: (resp:any) => {
            this.usuarios = resp.content;
            this.totalElementos = resp.totalElements;
            this.cargando = false;
          },
          error: (err) => {
            console.log(err);
            this.cargando = false;
          },
        })
      );
    }
    else{
      this.subscription.add(
        this.usuarioService.listaUsuarios(request).subscribe({
          next: (resp:any) => {
            this.usuarios = resp.content;
            this.totalElementos = resp.totalElements;
            this.cargando = false;
          },
          error: (err) => {
            console.log(err);
            this.cargando = false;
          },
        })
      );
    }
  }

  nextPage(event: PageEvent){
    this.request['page'] = event.pageIndex.toString();
    this.request['size'] = event.pageSize.toString();
    this.obtenerUsuarios(this.request);
  }

  filtrar(){
    this.request = {page:"0", size:"5"};
    if(this.query != null || this.query.lenght() > 0){
      this.busquedaFiltro = true;
      this.obtenerUsuarios(this.request);
    }
    else{
      this.busquedaFiltro = false;
      this.obtenerUsuarios(this.request);
    }
    this.paginador.firstPage();
  }

  limpiarFiltro(){
    this.query = null;
    this.busquedaFiltro = false;
    this.request = {page:"0", size:"5"}
    this.paginador.firstPage();
    this.obtenerUsuarios(this.request);
  }

  nuevo(){
    this.usuario = {};
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      roles : [[""], [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8)]]
    })
    this.resetearFormAdd()
  }

  addNuevo(){
    if(this.editForm.valid){
      this.cargando = true;
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
          Swal.fire({
            icon: 'success',
            title: 'Se ha añadido correctamente el usuario!',
            showConfirmButton: true,
          })
          this.resetearFormAdd()
          this.obtenerUsuarios(this.request);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
          this.cargando = false;
        }
      });
      this.closebutton2.nativeElement.click();
    }
  }

  delete(id:any){
    this.usuarioIdDelete = id;
  }

  onDelete(){
    this.cargando = true;
    this.subscription.add(
      this.usuarioService.borrarUsuario(this.usuarioIdDelete).subscribe({
        next: (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'El usuario ha sido borrado correctamente!',
            showConfirmButton: true,
          })
          this.obtenerUsuarios(this.request);
        },
        error : (err) =>{ 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
          this.cargando = false;
        }
      })
    )
  }

  editar(event:Event){
    this.cargando = true;
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
            password : [this.usuario.password, [Validators.required, Validators.minLength(8)]]
          })
          this.cargando = false;
        },
        error : (err) => {
          console.log(err);
          this.cargando = false;
        }
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
      this.cargando = true;
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
      if(this.changePassword){
        this.usuarioService.editUsuarioConContraseña(userData, this.usuario.id).subscribe({
          next : (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Se ha editado correctamente el usuario!',
              showConfirmButton: true,
            })
            this.obtenerUsuarios(this.request);
          },
          error : (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            })
            this.cargando = false;
          }
        })
      }
      else{
        this.usuarioService.editUsuarioSinContraseña(userData, this.usuario.id).subscribe({
          next : (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Se ha editado correctamente el usuario!',
              showConfirmButton: true,
            })
            this.obtenerUsuarios(this.request);
          },
          error : (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            })
            this.cargando = false;
          }
        })
      }
      this.closebutton.nativeElement.click();
    }
  }

  resetearFormAdd(){
    this.editForm.reset();
    document.getElementById("addForm")?.classList.remove("ng-touched");
    document.getElementById("addForm")?.classList.remove("was-validated");
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
