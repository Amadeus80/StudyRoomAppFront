import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisDatosComponent } from './mis-datos.component';

const routes: Routes = [{ path: '', component: MisDatosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisDatosRoutingModule { }
