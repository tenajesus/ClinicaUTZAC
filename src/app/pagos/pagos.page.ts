import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  id:any;
  importe:any;
  fechaPago:any;
  concepto:any;
  receipt:any;
  

  constructor(
    public _apiService:ApiService,
    private alertController:AlertController,
    private route:ActivatedRoute

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

  addPay() {
    // console.log(this.expediente,this.fechaIngreso,this.nombre,this.edad,this.sexo,this.nacimiento,this.escolaridad,this.telefono,this.fisio);
    
    let data = {
  
      id:this.id,
      importe:this.importe,
      fechaPago:this.fechaPago,
      concepto:this.concepto,
      receipt:this.receipt
    }
    
  
    this._apiService.addPay(this.id,data).subscribe((res:any) => {
    console.log("Dato Registrado",res)
    this.id="",
    this.importe="",
    this.fechaPago="",
    this.concepto="",
    this.receipt=""

    this.presentAlert()
  
    },(error:any) => {
      console.log("Error ===", error)
    })
  }

}
