import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsoPaginaComponent } from './uso-pagina.component';

const routes: Routes = [{ path: '', component: UsoPaginaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsoPaginaRoutingModule { }
