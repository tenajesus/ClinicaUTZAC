import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';




@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {

  expediente:any;
  fechaIngreso:any;
  nombre:any;
  fisio:any;
  pacientes: any = [];
  searchedPaciente : any;
  

  constructor(
    private router: Router,
    public _apiService:ApiService,
    private alertCtrl: AlertController,
    private http: HttpClient,
    public navCtrl : NavController

    ) { }
  

  ngOnInit() {
    
    this.getEnfermos().subscribe(res => {
      console.log("Res",res)
      this.pacientes = res;
      this.searchedPaciente = this.pacientes;
    })
    
  }

  getEnfermos(){
    return this.http.get("http://localhost/ionic/backend/getStudents.php")
    .pipe(
      map((res:any) => {
      return res;
    })
    )
  }

  goToHome(){
    this.router.navigate(['/'])
  }

   
  searchPaciente(event: any){
    const text = event.target.value;
    this.searchedPaciente = this.pacientes;
    if(text && text.trim() != ''){
      this.searchedPaciente = this.searchedPaciente.filter((paciente:any) =>{
        return (paciente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }
}
