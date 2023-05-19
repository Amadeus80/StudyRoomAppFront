import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';


@NgModule({
  declarations: [
    ReservarComponent
  ],
  imports: [
    CommonModule,
    ReservarRoutingModule
  ]
})
export class ReservarModule { }
