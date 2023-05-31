import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ConsultasComponent } from './consultas/consultas.component';

const routes: Routes = [
  { path: '', redirectTo : "usuarios", pathMatch : "full" },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'consultas', component: ConsultasComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
