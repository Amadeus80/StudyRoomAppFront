import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisDatosRoutingModule } from './mis-datos-routing.module';
import { MisDatosComponent } from './mis-datos.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MisDatosComponent
  ],
  imports: [
    CommonModule,
    MisDatosRoutingModule,
    ReactiveFormsModule
  ]
})
export class MisDatosModule { }
