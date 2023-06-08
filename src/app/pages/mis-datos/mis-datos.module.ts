import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisDatosRoutingModule } from './mis-datos-routing.module';
import { MisDatosComponent } from './mis-datos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from 'src/app/shared/components/shareds/shareds.module';


@NgModule({
  declarations: [
    MisDatosComponent
  ],
  imports: [
    CommonModule,
    MisDatosRoutingModule,
    ReactiveFormsModule,
    SharedsModule
  ]
})
export class MisDatosModule { }
