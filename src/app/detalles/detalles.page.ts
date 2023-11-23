import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  id:any;
  fechaIngreso:any;
  name:any;
  edad:any;
  sexo:any;
  nacimiento:any;
  fisio:any;
  sesiones:any;
  valora:any;
  expediente:any;
  pagostotal:any;
  sesionestotal:any;
  pagos:any = [];
  sesions:any=[];


  constructor(
    public _apiService:ApiService,
    private route:ActivatedRoute
  ) { 

      this.route.params.subscribe((param:any) => {
      this.id = param.id;
      this.getDetalles(this.id);
      this.getPagos(this.id);
      this.getSesiones(this.id);


      })
  }

  ngOnInit() {
    
  }

  getDetalles(id:any){
    this._apiService.getDetalles(id).subscribe((res:any) =>{
      console.log("Success",res);
      let paciente = res [0];
      this.id = paciente.id;
      this.fechaIngreso = paciente.fechaIngreso;
      this.name = paciente.nombre;
      this.edad = paciente.edad;
      this.sexo = paciente.sexo;
      this.nacimiento = paciente.nacimiento;
      this.fisio = paciente.fisio;
      this.sesiones = paciente.sesiones;
      this.valora = paciente.valoracion;
      console.log(res.length)
    },(err:any) => {
      console.log("ERROR", err)
    })
  }

  getPagos(id:any){
    this._apiService.getPagos(id).subscribe((res:any) =>{
      console.log("Success",res);
      this.pagos = res;
      this.pagostotal = res.length;
    },(err:any) => {
      console.log("ERROR", err)
    })
  }

  getSesiones(id:any){
    this._apiService.getSesiones(id).subscribe((res:any) =>{
      console.log("Success",res);
      this.sesions = res;
      this.sesionestotal = res.length;
    },(err:any) => {
      console.log("ERROR", err)
    })
  }

}
