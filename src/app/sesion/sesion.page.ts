import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

  id:any;
  fechaSesion:any;
  numSesion:any;
  actividad:any;
  realidadaumentada:any;
  fisio:any;
  semaforo:any;
  indicaciones:any;
  proximasesion:any;
  pacientes: any = [];

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    public _apiService:ApiService,
    private alertController:AlertController
  ) {

    this.route.params.subscribe((param:any) => {
    this.id = param.id;
    console.log(this.id);
    this.getPaciente(this.id);
    })

   }

  ngOnInit() {
    
  }

  getPaciente(id:any){
    this._apiService.getPaciente(id).subscribe((res:any) =>{
      console.log("Success",res);
      let paciente = res [0];
      this.id = paciente.id;
  
    },(err:any) => {
      console.log("ERROR", err)
    })
  }

  async presentAlert() {

    const alert = await this.alertController.create({
    header: 'Datos Registrados',
    message: 'Los datos han sido registrados',
    buttons: ['OK'],
  });

  await alert.present();
  }


addSesion() {
  // console.log(this.expediente,this.fechaIngreso,this.nombre,this.edad,this.sexo,this.nacimiento,this.escolaridad,this.telefono,this.fisio);
  
  let data = {

    id:this.id,
    fechaSesion:this.fechaSesion,
    numSesion:this.numSesion,
    actividad:this.actividad,
    realidadaumentada:this.realidadaumentada,
    fisio:this.fisio,
    semaforo:this.semaforo,
    indicaciones:this.indicaciones,
    proximasesion:this.proximasesion
  }
  

  this._apiService.addSesion(this.id,data).subscribe((res:any) => {
  console.log("Dato Registrado",res)
  this.id="",
  this.fechaSesion="",
  this.numSesion="",
  this.actividad="",
  this.realidadaumentada="",
  this.fisio="",
  this.semaforo="",
  this.indicaciones="",
  this.proximasesion=""
  this.presentAlert()

  },(error:any) => {
    console.log("Error ===", error)
  })
}

}
