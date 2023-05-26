import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BotonDeleteComponent } from './boton-delete/boton-delete.component';
import { BotonEditComponent } from './boton-edit/boton-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    UsuariosComponent,
    BotonDeleteComponent,
    BotonEditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
