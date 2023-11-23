import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcesamientoPageRoutingModule } from './procesamiento-routing.module';

import { ProcesamientoPage } from './procesamiento.page';
import { ChartComponent } from '../chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcesamientoPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ProcesamientoPage,
    ChartComponent]
})
export class ProcesamientoPageModule {}
