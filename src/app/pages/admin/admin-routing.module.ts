import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { AddComunicadoComponent } from './add-comunicado/add-comunicado.component';
import { ConsultarReservaComponent } from './consultar-reserva/consultar-reserva.component';

const routes: Routes = [
  { path: '', redirectTo : "consultar-reserva", pathMatch : "full" },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: 'add-comunicado', component: AddComunicadoComponent },
  { path: 'consultar-reserva', component: ConsultarReservaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
