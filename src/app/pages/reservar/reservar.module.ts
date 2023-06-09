import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from 'src/app/shared/components/shareds/shareds.module';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ReservarComponent
  ],
  imports: [
    CommonModule,
    ReservarRoutingModule,
    ReactiveFormsModule,
    SharedsModule,
    MatTooltipModule
  ]
})
export class ReservarModule { }
