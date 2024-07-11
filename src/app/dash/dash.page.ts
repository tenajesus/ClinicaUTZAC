import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries,ApexChart,ApexDataLabels,ApexFill,ApexGrid,ApexLegend,ApexMarkers,ApexPlotOptions,
  ApexStroke,ApexTitleSubtitle,ApexTooltip,ApexXAxis,ApexYAxis,} from 'ng-apexcharts';
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
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {

  pacientesEdad:any = [];
  pacienteSesiones:any = [];
  pacientes:any = [];
  edades:any
  sesiones:any
  fisios:any
  

  public options: Partial<ChartOptions> | any;
  public barOptions: Partial<ChartOptions> | any;
  public areaOptions: Partial<ChartOptions> | any;
  // public radial: Partial<ChartOptions>;

  
  constructor(
    public http:HttpClient,
    public _apiService : ApiService
  ) { 
    
  
  }
 
  getEdades(){
    this._apiService.getPacientes().subscribe((res:any) =>{
      this.pacientes = res
      const edades = res.map((item:any) => parseInt(item.edad))
      const sesiones = res.map((item:any) => parseInt(item.sesiones))
      console.log(edades)
      console.log(sesiones)
      this.spackLine(edades, sesiones);  
    });    
  }

  getFisios(){
    this._apiService.getFisios().subscribe((res:any) =>{
      this.pacientes = res
      const fisios = res.map((item:any) => parseInt(item.fisioterapeuta))
      console.log(fisios)
      this.barChart(fisios);  
    });    
  }


  spackLine(res:any, resSesiones:any) {
    this.options = {
      chart: {
        type: 'area',
        height: 350,
        // sparkline: {
        //   enabled: false,
        // },
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
        text:"Paciente vs Sesiones requeridas"
      },
      labels:resSesiones,
      xaxis:{
        type:"datetime"
      },
      series: [
        { 
          name:"Edad",
          data: res
          //data: [42,16]

        },
        {
          name:"Sesiones",
          data: resSesiones
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

  barChart(res:any) {
    this.barOptions = {
      chart: {
        type: 'bar',
        height: 200,
        width: '100%',
        stacked: true,
        toolbar: {
        show: true,
        },
      },
      series: [
        {
          name: 'Atención por Fisioterapeuta',
          data: res,
        },
      ],
      labels: ["Domingo", "Juan Carlos", "Andrea Martinez", "Hector Palacio"],
      grid: {
        borderColor: '#343E59',
        padding: {
          right: 0,
          left: 0,
        },
      },
      xaxis: {
        labels: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          style: {
            colors: '#78909c',
          },
        },
      },
      title: {
        text: 'Fisioterapeutas',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#78909c',
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        labels: {
          colors: '#78909c',
        },
      },
    };
  }

  areaChart() {
    this.areaOptions = {
      chart: {
        type: 'area',
        height: 180,
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          name: 'Sales',
          data: [
            47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93,
            53, 61, 27, 54, 43, 19, 46,
          ],
        },
      ],
      stroke: {
        width: 2,
        colors: ['#ffd3a5'],
      },
      fill: {
        colors: ['#ffd3a5'],
        gradient: {
          gradientToColors: ['#2b2d3e'],
          opacityTo: 0.2,
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$1K',
        offsetX: 30,
        style: {
          fontSize: '24px',
          color: '#78909c',
        },
      },
      subtitle: {
        text: 'Ingresos por Atención a pacientes',
        offsetX: 30,
        style: {
          fontSize: '14px',
          color: '#78909c',
        },
      },
    };
  }

  ngOnInit() {
    this.getEdades();
    this.getFisios()
    this.spackLine(this.edades, this.sesiones);
    this.barChart(this.fisios);
    this.areaChart()
     }

}
