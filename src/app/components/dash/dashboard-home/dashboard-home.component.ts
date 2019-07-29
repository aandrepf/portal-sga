import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../../services/dashboard.service';

import { trigger, transition, useAnimation } from '@angular/animations';
import { slideOutDown, slideInUp, zoomOut, zoomIn } from 'ng-animate';

import { IDashboardRequest, IDashboard, DashboardNavNU, NivelUnidadePai } from '../../../models/dashboard.model';
import { ENNivelUnidades } from './../../../models/enum';
import { Subscription, Observable, timer } from 'rxjs';

import DashboardResponseTest from '../dashboard.response.test';
import { GlobalStats } from 'src/app/shared/global-stats';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css'],
    animations: [
        trigger('slideInOut', [
            transition('up => down', useAnimation(slideOutDown, {
              params: { timing: 0.5, delay: 0, a: '100px', d: '10px' }
            })),
            transition('down => up', useAnimation(slideInUp, { params: { timing: 0.5, delay: 0 } }))
        ]),
        trigger('zoomOutIn', [
            transition('in => out', useAnimation(zoomOut, { params: { timing: 0.5, delay: 0 } })),
            transition('out => in', useAnimation(zoomIn, { params: { timing: 0.5, delay: 0 } })),
        ])
    ]
})
export class DashboardHomeComponent implements OnInit {
  private _subTimer: Subscription;
  private _dashboardRequest: IDashboardRequest;
  public dashboard: IDashboard[];
  public nuControl: DashboardNavNU;

  private _nuFather: NivelUnidadePai = new NivelUnidadePai();
  private _nuChild: NivelUnidadePai = new NivelUnidadePai();

  public tableAnimateState = 'up';
  public cardAnimateState = 'up';

  public isTableShow = true;
  public load = false;
  public dados = false;

  ticks: string;
  timer: any;
  dashCount: number;

  constructor(private _dash: DashboardService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.hide();
    setTimeout(() => {
      this.spinner.hide();
      this.load = true;
      this.timer = timer(0, 600 * 1000);
      this.showFirstNU();
    }, 1500);
  }

  tickerFunc(tick: any) {
    const ticksDate = new Date(0, 0, 0, 0, 0, tick, 0);
    this.ticks = ticksDate.toString();
    this.ticks = this.ticks.substring(16, 24);
    console.log('tick dash');
    this.doPegaDashboard(this._nuChild);
  }

  private getChildNivelUnidade(nu: ENNivelUnidades): ENNivelUnidades {
    if (nu === ENNivelUnidades.Rede) { return ENNivelUnidades.Regional; }
    if (nu === ENNivelUnidades.Regional) { return ENNivelUnidades.Agencia; }
  }

  private getFatherNivelUnidade(nu: ENNivelUnidades): ENNivelUnidades {
    if (nu === ENNivelUnidades.Rede) { return ENNivelUnidades.Matriz; }
    if (nu === ENNivelUnidades.Agencia) { return ENNivelUnidades.Regional; }
    if (nu === ENNivelUnidades.Regional) { return ENNivelUnidades.Rede; }
  }

  private getNivelUnidadeTitulo(nu: ENNivelUnidades): string {
    if (nu === ENNivelUnidades.Rede) { return 'DIRETORIA REGIONAL'; }
    if (nu === ENNivelUnidades.Regional) { return 'GERENCIA REGIONAL'; }
    if (nu === ENNivelUnidades.Agencia) { return 'AGÊNCIA'; }
  }

  private showFirstNU() {
    this._nuChild.nome = 'BRASIL';
    this._nuChild.codigoUnidadePai = 1;
    this._nuChild.nivelunidade = ENNivelUnidades.Rede;
    this._subTimer = this.timer.subscribe((t: any) => {
      this.tickerFunc(t);
    });
  }

  doPegaDashboard(nuPai: NivelUnidadePai) {
    this._dash.getDashInfo(nuPai.nivelunidade, nuPai.codigoUnidadePai).subscribe(
    (info: any[]) => {
      this.dashboard = info;
      this.dashCount = this.dashboard.length;

      if(this.dashboard.length !== 0) {
        this.dados === true;
        this.tableAnimateState = 'up';
        this.cardAnimateState = 'in';
        this.nuControl = new DashboardNavNU();
        this.nuControl = {
          Titulo: this.getNivelUnidadeTitulo(nuPai.nivelunidade),
          NivelUnidade: nuPai.nivelunidade,
          NivelUnidadePai: nuPai.codigoUnidadePai,
          Nome: nuPai.nome
        };
      }

      /*if(this.dashboard.length === 0) {
        switch(nuPai.nivelunidade) {
          case 2:
            this.dashboard = GlobalStats.REDE;
            this.dashCount = this.dashboard.length;
            break;
          case 1:
            this.dashboard = GlobalStats.REGIONAL;
            this.dashCount = this.dashboard.length;
            break;
          case 9:
            this.dashboard = GlobalStats.AGENCIA;
            this.dashCount = this.dashboard.length;
            break;
        }

        //this.nuControl = new DashboardNavNU();
        this.nuControl = {
          Titulo: this.getNivelUnidadeTitulo(nuPai.nivelunidade),
          NivelUnidade: nuPai.nivelunidade,
          NivelUnidadePai: nuPai.codigoUnidadePai,
          Nome: nuPai.nome
        };
      }*/
    });
  }

  getTableSelectedItem(item: IDashboard) {
      this.tableAnimateState = 'down';
      this.cardAnimateState = 'out';
      setTimeout(() => {
        this._nuChild.nome = item.nomeUnidade;
        this._nuChild.codigoUnidadePai = item.codigoUnidade;
        this._nuChild.nivelunidade = this.getChildNivelUnidade(item.nivelUnidade);

        this._nuFather.codigoUnidadePai = item.codigoUnidadePai;
        this._nuFather.nome = this._nuChild.nome;
        this._nuFather.nivelunidade = item.nivelUnidade;

        this.doPegaDashboard(this._nuChild);
      }, 500);

  }

  backToNivelUnidadePai(navNu: DashboardNavNU) {
      this.tableAnimateState = 'down';
      this.cardAnimateState = 'out';
      setTimeout(() => {
        const nu = this.getFatherNivelUnidade(navNu.NivelUnidade);
        if (nu === ENNivelUnidades.Rede) {
          this.showFirstNU();
        } else {
          this.doPegaDashboard(this._nuFather);
        }
    }, 500);

  }

  handleTableShow() {
    this.isTableShow = this.isTableShow === true ? false : true;
  }
}
