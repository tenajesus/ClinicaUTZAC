import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-update-paciente',
  templateUrl: './update-paciente.page.html',
  styleUrls: ['./update-paciente.page.scss'],
})
export class UpdatePacientePage implements OnInit {
  id:any;
  expediente:any;
  fechaIngreso:any;
  nombre:any;
  edad:any;
  sexo:any;
  nacimiento:any;
  escolaridad:any;
  telefono:any;
  fisio:any;
  pacientes: any = [];


  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private _apiService: ApiService
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
      this.expediente = paciente.expediente;
      this.fechaIngreso = paciente.fechaIngreso;
      this.nombre = paciente.nombre;
      this.edad = paciente.edad;
      this.sexo = paciente.sexo;
      this.nacimiento = paciente.nacimiento;
      this.escolaridad = paciente.escolaridad;
      this.telefono = paciente.telefono;
      this.fisio = paciente.fisio;

    },(err:any) => {
      console.log("ERROR", err)
    })
  }

  updatePaciente(){
    
    let data = {
      id:this.id,
      expediente:this.expediente,
      fechaIngreso:this.fechaIngreso,
      nombre:this.nombre,
      edad:this.edad,
      sexo:this.sexo,
      nacimiento:this.nacimiento,
      escolaridad:this.escolaridad,
      telefono:this.telefono,
      fisio:this.fisio
    }
    this._apiService.update(this.id,data).subscribe((res:any) =>{
      console.log("Success",res);
      this.router.navigateByUrl('/pacientes')
      },(err:any) => {
      console.log("ERROR", err)
    })
  }

}
