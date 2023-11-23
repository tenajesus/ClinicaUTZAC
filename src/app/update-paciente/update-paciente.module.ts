import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePacientePageRoutingModule } from './update-paciente-routing.module';

import { UpdatePacientePage } from './update-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePacientePageRoutingModule
  ],
  declarations: [UpdatePacientePage]
})
export class UpdatePacientePageModule {}
