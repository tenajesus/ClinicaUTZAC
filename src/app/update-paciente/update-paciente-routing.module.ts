import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePacientePage } from './update-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePacientePageRoutingModule {}
