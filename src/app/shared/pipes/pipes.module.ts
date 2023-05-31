import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from './error.pipe';
import { RemoveRolPipe } from './remove-rol.pipe';
import { FechaPipe } from './fecha.pipe';



@NgModule({
  declarations: [
    ErrorPipe,
    RemoveRolPipe,
    FechaPipe
  ],
  imports: [
    CommonModule
  ],
  exports : [ErrorPipe, RemoveRolPipe, FechaPipe]
})
export class PipesModule { }
