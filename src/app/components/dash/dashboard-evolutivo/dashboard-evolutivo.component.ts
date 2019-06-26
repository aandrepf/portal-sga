import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IDashboard } from 'src/app/models/dashboard.model';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-evolutivo',
  templateUrl: './dashboard-evolutivo.component.html',
  styleUrls: ['./dashboard-evolutivo.component.css']
})
export class DashboardEvolutivoComponent implements OnInit, OnChanges {
  @Input() public dashboard: IDashboard[] = [];

  private _ticks: string;
  private _timer: any;

  result: any[];

  public lineChartPlugins = [];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions: ChartOptions = {
    responsive: true
  };

  constructor() {}

  ngOnChanges() {}

  ngOnInit() {}

}
