import { DashboardService } from './../../../../services/dashboard.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IDashboard } from './../../../../models/dashboard.model';
import { ChartOptions } from 'chart.js';

export class Totais {
  tNormal: number;
  tAlerta: number;
  tCritico: number;
  tOffline: number;
}

@Component({
  selector: 'app-dashboard-totem-chart',
  templateUrl: './dashboard-totem-chart.component.html',
  styleUrls: ['./dashboard-totem-chart.component.css']
})
export class DashboardTotemChartComponent implements OnInit, OnChanges {
  @Input() public dashboard: IDashboard[] = [];
  public totais: Totais;
  public pieChartLabels:string[] = [];
  public pieChartData: any[] = [];
  public pieChartType:string = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
      position: 'left',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        offset: -35,
        color: '#ffffff',
        backgroundColor: '#424242',
        formatter: function (value, context) {
          const info: any = context.chart.data.labels[context.dataIndex];
          return info.split(': ')[0] + "\nPCT: " + value.toFixed(2) + '%\nQTDE: '+ info.split(': ')[1];
        },
        font: {
          weight: 'normal',
          size: 8,
        },
        display: function(context) {
          return context.dataset.data[context.dataIndex] >= 1; // or >= 1 or ...
       }
      },
    }
  };
  public pieChartColors = [
    {
      backgroundColor: ["#2DB951", "#D8CF46", "#E62323", "#646464"],
    },
  ];

  constructor(private _service: DashboardService) { }
  ngOnChanges() {
    if (this.dashboard != null) {
      this.loadChart();
    }
  }
  ngOnInit() {}

  loadChart() {
    let tNormal = this.dashboard.map(item => item.totalNormal).reduce((prev, curr) => {
      return prev + curr;
    });
    let tAlerta = this.dashboard.map(item => item.totalAlerta).reduce((prev, curr) => {
      return prev + curr;
    });
    let tCritico = this.dashboard.map(item => item.totalCritico).reduce((prev, curr) => {
      return prev + curr;
    });
    let tOffline = this.dashboard.map(item => item.totalOffLine).reduce((prev, curr) => {
      return prev + curr;
    });

    this.totais = new Totais();
    this.totais.tNormal = tNormal;
    this.totais.tAlerta = tAlerta;
    this.totais.tCritico = tCritico;
    this.totais.tOffline = tOffline;

    this.pieChartLabels = [
      "NORMAL: "+ this.totais.tNormal +"",
      "ALERTA: "+ this.totais.tAlerta +"",
      "CRITICO: "+ this.totais.tCritico +"",
      "TOTENS OFFLINE: " + this.totais.tOffline +""
    ];

    let totalCriticidade = tNormal + tAlerta + tCritico + tOffline;
    const arrayPie = [
      tNormal / totalCriticidade * 100,
      tAlerta / totalCriticidade * 100,
      tCritico / totalCriticidade * 100,
      tOffline / totalCriticidade * 100
    ]
    this.pieChartData = arrayPie;
  }
}
