import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries,ApexChart,ApexDataLabels,ApexFill,ApexGrid,ApexLegend,ApexMarkers,ApexPlotOptions,
  ApexStroke,ApexTitleSubtitle,ApexTooltip,ApexXAxis,ApexYAxis,} from 'ng-apexcharts';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { reduce } from 'rxjs';



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
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  pacientesEdad:any = [];
  pacienteSesiones:any = [];
  pacientes:any = [];
  edades:any
  sesiones:any
  fisios:any
  lana:any
  total:any
  sesgroup:any
  totalses:any

  

  public options: Partial<ChartOptions> | any;
  public barOptions: Partial<ChartOptions> | any;
  public areaOptions: Partial<ChartOptions> | any;
  public Sesionoptions: Partial<ChartOptions> | any;

  constructor(
    public http:HttpClient,
    public _apiService : ApiService
  ) { }

  

  getEdades(){
    this._apiService.getGrupoEdades().subscribe((res:any) =>{
      this.pacientes = res
      const edades = res.map((item:any) => parseInt(item.edad))
      const totales = res.map((item:any) => parseInt(item.Edades))
      console.log(edades)
      console.log(totales)
      this.spackLine(edades, totales);  
    });    
  }
  getGenero(){
    this._apiService.getGenero().subscribe((res:any) =>{
      this.pacientes = res
      const genero = res.map((item:any) => parseInt(item.Genero))
      console.log(genero)
      this.barChart(genero);  
    });    
  }

  getMoney(){
    this._apiService.getMoney().subscribe((res:any) =>{
      this.pacientes = res
      const lana = res.map((item:any) => parseInt(item.importe))
      const total = lana.reduce((prev:any,curr:any) => prev + curr,0)
      this.areaChart(lana,total);  
    });    
  }

  getSesionGrupo(){
    this._apiService.getSesionGrupo().subscribe((res:any) =>{
      this.pacientes = res
      const sesgroup = res.map((item:any) => parseInt(item.sesiones))
      const totalses = res.map((item:any) => parseInt(item.SesionesInfo))
      this.SesionesLine(sesgroup,totalses);  
    });    
  }

  SesionesLine(sesgroup:any, totalses:any) {
    this.Sesionoptions = {
      series: [
        {
          name: "Sesiones Requeridas",
          data: sesgroup
        },
        {
          name: "Pacientes",

          data: totalses
        }
      ],
      chart: {
        type: "bar",
        height: 430

      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
          position: "top"
          }
        }
      },
      title: {
        text: "Pacientes agrupados por Sesiones Requeridas"
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: sesgroup
      }
    };
  }

  spackLine(res:any, resSesiones:any) {
    this.options = {
      series: [
        {
          name: "Edad",
          data: res
        },
        {
          name: "Pacientes",

          data: resSesiones
        }
      ],
      chart: {
        type: "bar",
        height: 430

      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
          position: "top"
          }
        }
      },
      title: {
        text: "Pacientes agrupados por Edad"
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007]
      }
    };
  }

  barChart(res:any) {
    this.barOptions = {
      series: res,
      chart: {
        width: 300,
        type: "pie"
      },
      labels: ["Hombres", "Mujeres"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  areaChart(res:any,resTotal:any) {
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
          name: 'Importe',
          data: res
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
        text: '$ ' + resTotal,
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
    this.getGenero();
    this.getMoney();
    this.getSesionGrupo()
    this.spackLine(this.edades, this.sesiones);
    this.barChart(this.fisios);
    this.areaChart(this.lana,this.total)
    this.SesionesLine(this.sesgroup, this.totalses)
     }

}
