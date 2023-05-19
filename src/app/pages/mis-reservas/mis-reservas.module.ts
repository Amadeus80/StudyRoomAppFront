import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisReservasRoutingModule } from './mis-reservas-routing.module';
import { MisReservasComponent } from './mis-reservas.component';


@NgModule({
  declarations: [
    MisReservasComponent
  ],
  imports: [
    CommonModule,
    MisReservasRoutingModule
  ]
})
export class MisReservasModule { }
