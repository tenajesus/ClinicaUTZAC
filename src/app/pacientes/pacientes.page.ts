import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  expediente:any;
  fechaIngreso:any;
  nombre:any;
  edad:any;
  sexo:any;
  nacimiento:any;
  escolaridad:any;
  telefono:any;
  fisio:any;
  pacientes: any =[];

  constructor(
    private router: Router,
    public _apiService:ApiService,
    private alertCtrl: AlertController
    ) { 
      this.getPacientes()
    }
  

  ngOnInit() {
  }

  goToHome(){
    this.router.navigate(['/'])
  }

  getPacientes(){
    this._apiService.getPacientes().subscribe((res:any) => {
      console.log("Succes ===",res)
      this.pacientes = res;

      },(error:any) => {
        console.log("Error ===", error)
      })
  }

  deletePaciente(id:any){
    this._apiService.deletePaciente(id).subscribe((res:any) =>{
      console.log(id)
      console.log("Success");
      this.getPacientes();
    },(err:any) => {
      console.log("Error:", err)
      console.log(id);
    })
  }

  async presentConfirm(id:any) {
    let alert = await this.alertCtrl.create({
      header: 'Confirmar acción ',
      message: 'Realmente desea eliminar el registro ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, Eliminar',
          handler: () => {
            this.deletePaciente(id);
          }
        }
      ]
    });
    await alert.present();
  }
}
