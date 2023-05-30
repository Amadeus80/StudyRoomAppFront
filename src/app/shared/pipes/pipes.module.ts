import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from './error.pipe';
import { RemoveRolPipe } from './remove-rol.pipe';



@NgModule({
  declarations: [
    ErrorPipe,
    RemoveRolPipe
  ],
  imports: [
    CommonModule
  ],
  exports : [ErrorPipe, RemoveRolPipe]
})
export class PipesModule { }
