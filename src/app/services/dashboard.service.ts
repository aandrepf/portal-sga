import { GlobalDashboard } from './../shared/global-dashboard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENMetaAtdtSts, ENDashVmapDataScaleType } from './../models/enum';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

import {
    IDashboard,
    DashboardCalcs,
    DashboardRegionsVectorMap,
    IDashboardBrazilStatesDataVectorMap
} from '../models/dashboard.model';
import { Config } from 'protractor';


@Injectable()
export class DashboardService {
    public appConfig: Config;
    private _calcs: DashboardCalcs;
    private _metaTest: any = {
        meta: 20,
        porcAlerta: 50,
        porcCritico: 90
    };

    constructor(private _http: HttpClient) {
      setTimeout(() => {
        this.appConfig = JSON.parse(sessionStorage.getItem('urls'));
      }, 500);
    }

    getDashInfo(nu: number, codPai: number) {
      const url = this.appConfig.urlAzureServer + GlobalDashboard.DADOS_DASH + '/' + nu + '/' + codPai + '/' + (-1);
      return this._http.get(url);
    }

    private getVmapBrazilRegionsValueJson(vmapBrazilRegionUfTme: IDashboardBrazilStatesDataVectorMap[]) {

        let ret = '';
        let itemCount = 0;

        ret += '{';

        vmapBrazilRegionUfTme.forEach(item => {
            itemCount++;
            ret += `"${item.uf}": "${item.qca}"`;
            if (itemCount < vmapBrazilRegionUfTme.length) {
                ret += ',';
            }
        });

        ret += '}';

        return JSON.parse(ret);

    }

    public getAtdtTmeColorScale(maiorTme: number) {

        if (maiorTme === -1) {
            return '#666666';
        }

        const metaAtdtSts = this.getCalcMetaAtdtSts(maiorTme);

        switch (metaAtdtSts) {
            case ENMetaAtdtSts.NORMAL: return '#009688';
            case ENMetaAtdtSts.ALERTA: return '#ffc107';
            case ENMetaAtdtSts.CRITICO: return '#f44336';
        }

    }

    public getCalcMetaAtdtSts(tme: number): ENMetaAtdtSts {

        tme = Math.floor(tme / 60); // converter segundo para minuto

        const metaAlerta = (this._metaTest.meta * this._metaTest.porcAlerta) / 100;
        const metaCritico = (this._metaTest.meta * this._metaTest.porcCritico) / 100;

        if (tme >= metaAlerta && tme < metaCritico) {
            return ENMetaAtdtSts.ALERTA;
        } else if (tme > metaCritico) {
            return ENMetaAtdtSts.CRITICO;
        } else {
            return ENMetaAtdtSts.NORMAL;
        }

    }

    public doCalcs(dashboard: IDashboard[]): DashboardCalcs {
        this._calcs = new DashboardCalcs();
        dashboard.forEach(element => {
            this._calcs.QCA += element.qca;
            this._calcs.PorcPrazo += element.paa;
            this._calcs.Unidades += 1;
            if (element.tme > this._calcs.MaiorTE) {
                this._calcs.MaiorTE = element.tme;
            }
        });
        this._calcs.MediaPrazo = this._calcs.PorcPrazo / this._calcs.Unidades;
        return this._calcs;
    }

    public getVMapBrazilRegionsCalcData(dashboard: IDashboard[], type: ENDashVmapDataScaleType): any {
        const vmapRegions = new DashboardRegionsVectorMap();
        const temp: IDashboardBrazilStatesDataVectorMap[] = [];
        dashboard.forEach(element => {
            let value: IDashboardBrazilStatesDataVectorMap;
            const regionId = vmapRegions.data.find(x => x.regionUf === element.uf.toLocaleLowerCase()).regionId;
            value = { uf: element.uf.toLocaleLowerCase(), tme: element.tme, id: regionId, qca: element.qca };
            const isItem = temp.some((el) => el.uf === value.uf);
            if (!isItem) {
                temp.push(value);
            } else {
                const itemIndex = temp.findIndex(item => item.id === value.id);
                if (temp[itemIndex].tme < value.tme) {
                    temp[itemIndex].tme = value.tme;
                }
                if (temp[itemIndex].qca < value.qca) {
                    temp[itemIndex].qca = value.qca;
                }
            }
        });

        const vmapBrazilStatesData: IDashboardBrazilStatesDataVectorMap[] = [];

        vmapRegions.data.forEach(element => {

            const isRegionId = temp.some((el) => el.id === element.regionId);

            let value: IDashboardBrazilStatesDataVectorMap;

            if (isRegionId) {

                const tempFilter = temp
                    .filter(x => x.id === element.regionId)
                    .sort((a, b) => b.tme - a.tme)[0];

                const maiorTme = tempFilter.tme;
                const maiorQca = tempFilter.qca;

                value = {
                    id: element.regionId,
                    tme: maiorTme,
                    qca: maiorQca,
                    uf: element.regionUf
                };



            } else {

                value = {
                    id: element.regionId,
                    tme: 0,
                    qca: 0,
                    uf: element.regionUf
                };

            }

            vmapBrazilStatesData.push(value);

        });


        return this.getVmapBrazilRegionsValueJson(vmapBrazilStatesData);


    }

    public getVMapBrazilStatesCalcData(dashboard: IDashboard[]): any {

        const vmapRegions = new DashboardRegionsVectorMap();

        const temp: IDashboardBrazilStatesDataVectorMap[] = [];

        dashboard.forEach(element => {

            let value: IDashboardBrazilStatesDataVectorMap;

            const regionId = vmapRegions.data.find(x => x.regionUf === element.uf.toLocaleLowerCase()).regionId;

            value = { uf: element.uf.toLocaleLowerCase(), tme: element.tme, id: regionId, qca: element.qca };

            const isItem = temp.some((el) => el.uf === value.uf);

            if (!isItem) {

                temp.push(value);

            } else {

                const itemIndex = temp.findIndex(item => item.uf === value.uf);

                if (temp[itemIndex].tme < value.tme) {
                    temp[itemIndex].tme = value.tme;
                }

                if (temp[itemIndex].qca < value.qca) {
                    temp[itemIndex].qca = value.qca;
                }

            }

        });

        const vmapBrazilStatesData: IDashboardBrazilStatesDataVectorMap[] = [];

        vmapRegions.data.forEach(element => {

            const isState = temp.some((el) => el.uf === element.regionUf);

            let value: IDashboardBrazilStatesDataVectorMap;

            if (!isState) {

                value = {
                    id: element.regionId,
                    tme: 0,
                    qca: 0,
                    uf: element.regionUf
                };

            } else {

                value = {
                    id: element.regionId,
                    tme: temp.find(x => x.uf === element.regionUf).tme,
                    qca: temp.find(x => x.uf === element.regionUf).qca,
                    uf: element.regionUf
                };

            }

            vmapBrazilStatesData.push(value);

        });

        return this.getVmapBrazilRegionsValueJson(vmapBrazilStatesData);

    }

}
