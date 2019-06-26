import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { PipesModule } from './../../pipes/pipes.module';
import { SortableModule } from './../../sortable/sortable.module';
import { DashboardLegendComponent } from './dashboard-legend/dashboard-legend.component';
import { DashboardService } from './../../services/dashboard.service';
import { MaterialModule } from './../../shared/material.module';
import { DashboardQcaChartComponent } from './dashboard-charts/dashboard-qca-chart/dashboard-qca-chart.component';
import { DashboardTotemChartComponent } from './dashboard-charts/dashboard-totem-chart/dashboard-totem-chart.component';
import { DashboardEvolutivoComponent } from './dashboard-evolutivo/dashboard-evolutivo.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ChartsModule,
    PipesModule,
    SortableModule,
    MaterialModule
  ],
  declarations: [
    DashboardHomeComponent,
    DashboardTableComponent,
    DashboardLegendComponent,
    DashboardQcaChartComponent,
    DashboardTotemChartComponent,
    DashboardEvolutivoComponent
  ],
  providers: [DashboardService]
})
export class DashboardModule {}
