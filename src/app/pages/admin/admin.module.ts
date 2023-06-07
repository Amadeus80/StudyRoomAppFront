import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BotonDeleteComponent } from './boton-delete/boton-delete.component';
import { BotonEditComponent } from './boton-edit/boton-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { AddComunicadoComponent } from './add-comunicado/add-comunicado.component';
import { SharedsModule } from 'src/app/shared/components/shareds/shareds.module';


@NgModule({
  declarations: [
    AdminComponent,
    UsuariosComponent,
    BotonDeleteComponent,
    BotonEditComponent,
    NavAdminComponent,
    ConsultasComponent,
    AddComunicadoComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    SharedsModule
  ]
})
export class AdminModule { }
