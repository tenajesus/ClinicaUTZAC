import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  expediente:any;
  fechaIngreso:any;
  nombre:any;
  edad:any;
  sexo:any;
  nacimiento:any;
  escolaridad:any;
  telefono:any;
  fisio:any;
  sesiones:any;
  valoracion:any;
  pacientes: any = [];

  constructor(
    public _apiService:ApiService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
  }

  async presentAlert() {

      const alert = await this.alertController.create({
      header: 'Datos Registrados',
      message: 'Los datos han sido registrados',
      buttons: ['OK'],
    });

    await alert.present();
  }
  addStudent() {
    // console.log(this.expediente,this.fechaIngreso,this.nombre,this.edad,this.sexo,this.nacimiento,this.escolaridad,this.telefono,this.fisio);
    
    let data = {

      expediente:this.expediente,
      fechaIngreso:this.fechaIngreso,
      nombre:this.nombre,
      edad:this.edad,
      sexo:this.sexo,
      nacimiento:this.nacimiento,
      escolaridad:this.escolaridad,
      telefono:this.telefono,
      fisio:this.fisio,
      sesiones:this.sesiones,
      valoracion:this.valoracion

    }
    

    this._apiService.addStudent(data).subscribe((res:any) => {
    console.log("Dato Registrado",res)
    this.expediente="",
    this.fechaIngreso="",
    this.nombre="",
    this.edad="",
    this.sexo="",
    this.nacimiento="",
    this.escolaridad="",
    this.telefono="",
    this.fisio=""
    this.sesiones=""
    this.valoracion=""
    this.presentAlert()

    },(error:any) => {
      console.log("Error ===", error)
    })
  }
}
