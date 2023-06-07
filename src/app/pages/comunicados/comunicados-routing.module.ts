import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComunicadosComponent } from './comunicados.component';

const routes: Routes = [{ path: '', component: ComunicadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunicadosRoutingModule { }
