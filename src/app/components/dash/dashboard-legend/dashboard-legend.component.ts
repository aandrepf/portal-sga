import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { flipInX, flipOutX } from 'ng-animate';

import { IDashboard, DashboardCalcs, DashboardNavNU } from './../../../models/dashboard.model';
import { DashboardService } from './../../../services/dashboard.service';

@Component({
    selector: 'app-dashboard-legend',
    templateUrl: './dashboard-legend.component.html',
    styleUrls: ['./dashboard-legend.component.css'],
    animations: [
        trigger('bounceOutIn', [
            transition('in => out', useAnimation(flipOutX, { params: { timing: 0.5, delay: 0 } })),
            transition('out => in', useAnimation(flipInX, { params: { timing: 0.5, delay: 0 } })),
        ]),
    ]
})
export class DashboardLegendComponent implements OnInit, OnChanges {
    @Input() public dashboard: IDashboard[] = [];
    @Input() public nuControl: DashboardNavNU;
    @Output() eventFilter = new EventEmitter<DashboardNavNU>();
    public calcs: DashboardCalcs = new DashboardCalcs();
    public legendAnimateState = 'out';
    public nivel: any;

    constructor(private _dashService: DashboardService) { }
    ngOnInit() {}

    ngOnChanges():void {
      if(
          this.dashboard !== undefined || this.dashboard !== null ||
          this.nuControl !== undefined || this.nuControl !== null
        ) {
        this.legendAnimateState = 'out';
        setTimeout(() => {
          this.nivel = this.nuControl.NivelUnidade;
          this.calcs = this._dashService.doCalcs(this.dashboard);
          this.legendAnimateState = 'in';
        }, 1000);
      }
    }

    goBack() {
      this.eventFilter.emit(this.nuControl);
    }

}
