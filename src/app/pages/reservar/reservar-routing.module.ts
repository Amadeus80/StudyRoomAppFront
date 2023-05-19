import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarComponent } from './reservar.component';

const routes: Routes = [{ path: '', component: ReservarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservarRoutingModule { }
