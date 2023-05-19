import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsoPaginaRoutingModule } from './uso-pagina-routing.module';
import { UsoPaginaComponent } from './uso-pagina.component';


@NgModule({
  declarations: [
    UsoPaginaComponent
  ],
  imports: [
    CommonModule,
    UsoPaginaRoutingModule
  ]
})
export class UsoPaginaModule { }
