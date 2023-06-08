import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedsModule } from 'src/app/shared/components/shareds/shareds.module';


@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    SharedsModule
  ]
})
export class ContactModule { }
