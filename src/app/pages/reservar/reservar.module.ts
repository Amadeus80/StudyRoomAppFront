import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReservarComponent
  ],
  imports: [
    CommonModule,
    ReservarRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReservarModule { }
