import { Component, OnInit } from '@angular/core';
import { DatosService } from '../services/datos.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  public pacientes:any;
  currentPage = 1;

  constructor(private datosService: DatosService, private loadingCtrl:LoadingController ) { }

  ngOnInit() {
    this.loadPacientes();
    }

  async loadPacientes(){
    const loading = await this.loadingCtrl.create({
      message:'Cargando Datos..',
      spinner: 'bubbles'
    });
    await loading.present();

    this.datosService.getPacientes(this.currentPage).subscribe((res) => {
      
      loading.dismiss();
      this.pacientes = res.results;
      console.log(res) 
    })
  }
}
