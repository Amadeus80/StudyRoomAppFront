import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisDatosRoutingModule } from './mis-datos-routing.module';
import { MisDatosComponent } from './mis-datos.component';


@NgModule({
  declarations: [
    MisDatosComponent
  ],
  imports: [
    CommonModule,
    MisDatosRoutingModule
  ]
})
export class MisDatosModule { }
