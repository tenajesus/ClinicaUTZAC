import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend } from 'ng-apexcharts';
import { series } from './data';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { map } from 'rxjs';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent  implements OnInit {

  public chartOptions : ChartOptions;

  pacientes:any = [] ;
  result:any;
  pacienteEdad:any;
  pacienteSesiones:any;
  
  


  constructor(
    
    public _apiService:ApiService,
    private http: HttpClient,
    
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Edad",
          data: this.pacientes,
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Pacientes Atendidos por Periodos",
        align: "left"
      },
      subtitle: {
        text: "Pacientes",
        align: "left"
      },
      labels: this.pacienteSesiones,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
   }

  ngOnInit() {

      this.getEnfermos().subscribe(res => {

        this.pacientes = res;
        this.pacienteEdad = this.pacientes.map((item:any) => parseInt(item.edad));
        this.pacienteSesiones = this.pacientes.map((coins:any) => coins.fechaIngreso);
        
    
        console.log(this.pacienteEdad[0]);
        console.log(this.pacienteSesiones);
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

  

}

