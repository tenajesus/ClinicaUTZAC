import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries,ApexChart,ApexDataLabels,ApexFill,ApexGrid,ApexLegend,ApexMarkers,ApexPlotOptions,
  ApexStroke,ApexTitleSubtitle,ApexTooltip,ApexXAxis,ApexYAxis,} from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';


  export type ChartOptions = {
    chart: ApexChart;
    series: ApexAxisChartSeries | any[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    grid: ApexGrid;
    tooltip: ApexTooltip;
    colors: any[];
    labels: any[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    subtitle: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    fill: ApexFill;
    plotOptions: ApexPlotOptions;
    };


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
  semafor:any=[];
  semaforos:any;
  monitoreo:any;

  public options: Partial<ChartOptions> | any;


  constructor(
    public _apiService:ApiService,
    private route:ActivatedRoute
  ) { 

      this.route.params.subscribe((param:any) => {
      this.id = param.id;
      

      })
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

  getSesion(id:any){
    this._apiService.getSesiones(id).subscribe((res:any) =>{
      console.log("Success",res);
      this.sesions = res;
      this.sesionestotal = res.length;
      const monitoreo = res.map((item:any) => parseInt(item.Semaforo))
      console.log(monitoreo);
      this.spackLine(monitoreo);
    },(err:any) => {
      console.log("ERROR", err)
    })
  }

  spackLine(res:any) {
    this.options = {
      chart: {
        type: 'area',
        height: 350,
        sparkline: {
        enabled: false,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      dataLabels:{
        enabled:false
      },
      title:{
        text:"Semaforización del Paciente"
      },
      labels:res,
      xaxis:{
        type:"datetime"
      },
      series: [
        // { 
        //   name:"Edad",
        //   data: res
        //   //data: [42,16]

        // },
        {
          name:"Sesiones",
          data: res
          //data: [5,3]

        }
      ],
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          left: 110,
          bottom: 10,
        },
      },
      colors: ['#ff6'],
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function formatter(val:any) {
              // return ''; // remove title in tooltip
            },
          },
        },
      },
    };
  }

  ngOnInit() {
    this.getSesion(this.id);
      this.spackLine(this.monitoreo);
    this.getDetalles(this.id);
    this.getPagos(this.id);      
  }

}
