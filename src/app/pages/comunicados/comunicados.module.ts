import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunicadosRoutingModule } from './comunicados-routing.module';
import { ComunicadosComponent } from './comunicados.component';
import { SharedsModule } from 'src/app/shared/components/shareds/shareds.module';


@NgModule({
  declarations: [
    ComunicadosComponent
  ],
  imports: [
    CommonModule,
    ComunicadosRoutingModule,
    SharedsModule
  ]
})
export class ComunicadosModule { }
