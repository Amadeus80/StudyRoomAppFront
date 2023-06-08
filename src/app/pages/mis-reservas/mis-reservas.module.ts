import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisReservasRoutingModule } from './mis-reservas-routing.module';
import { MisReservasComponent } from './mis-reservas.component';
import { SharedsModule } from 'src/app/shared/components/shareds/shareds.module';


@NgModule({
  declarations: [
    MisReservasComponent
  ],
  imports: [
    CommonModule,
    MisReservasRoutingModule,
    SharedsModule
  ]
})
export class MisReservasModule { }
