import { DashboardService } from './../../../../services/dashboard.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IDashboard } from './../../../../models/dashboard.model';

import 'chartjs-plugin-datalabels';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
    selector: 'app-dashboard-qca-chart',
    templateUrl: './dashboard-qca-chart.component.html',
    styles: ['./dashboard-qca-chart.component.css']
})
export class DashboardQcaChartComponent implements OnInit, OnChanges {
  @Input() public dashboard: IDashboard[] = [];
  public maxCount: number;
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'start',
        color: '#fff',
        formatter: function (value, context) {
          const label = context.dataset.label;
          return 'QCA: ' + value;
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: this.maxCount,
          stepSize: this.maxCount / 4 // pega a soma total e divide por quatro
        }
      }]
    }
  };
  public barChartLabels: any[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor(private _service: DashboardService) { }
  ngOnInit() {}

  ngOnChanges() {
    if (this.dashboard != null) {
      this.maxCount = this.dashboard.map(item => item.qca).reduce((prev, curr) => {
        return prev + curr;
      });
      this.loadChart();
    }
  }

  loadChart() {
    this.barChartLabels = this.dashboard.map(item => item.nomeUnidade);
    const qcaChart = {
      data: this.dashboard.map(item => item.qca),
      label: 'QCA',
      backgroundColor: '#424242'
    }
    this.barChartData = [qcaChart];
  }
}
