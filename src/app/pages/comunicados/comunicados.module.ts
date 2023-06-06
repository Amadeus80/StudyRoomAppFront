import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunicadosRoutingModule } from './comunicados-routing.module';
import { ComunicadosComponent } from './comunicados.component';


@NgModule({
  declarations: [
    ComunicadosComponent
  ],
  imports: [
    CommonModule,
    ComunicadosRoutingModule
  ]
})
export class ComunicadosModule { }
