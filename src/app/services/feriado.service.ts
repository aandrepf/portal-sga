import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InterfaceService } from './interface.service';
import { GlobalFeriado } from '../shared/global-feriado';
import { GrabFeriadoByMes, GrabMunicipioByIdUF } from '../models/calendar.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class FeriadoService {

  public grabFeriado: GrabFeriadoByMes;
  public grabMunicipio: GrabMunicipioByIdUF;

  constructor(private _interface: InterfaceService, private _http: HttpClient) { }

  retornaClasseFeriado() {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.CLASSE_FERIADO;
    return this._http.get(url);
  }

  retornaUF() {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.UF;
    return this._http.get(url);
  }

  retornaMunicipio(estado: number) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.MUNICIPIO;
    this.grabMunicipio = new GrabMunicipioByIdUF();
    this.grabMunicipio.idEstado = estado;

    const body = JSON.stringify(this.grabMunicipio);

    return this._http.post(url, body, httpOptions);
  }

  retornaTipoFeriado() {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.TIPO_FERIADO;
    return this._http.get(url);
  }

  baixaListaFeriado(id: number, mes: string) {
    const url = this._interface.appConfig.urlHub + GlobalFeriado.BY_MES;
    this.grabFeriado = new GrabFeriadoByMes();
    this.grabFeriado.IdClasseFeriado = id;
    this.grabFeriado.Mes = mes;

    const body = JSON.stringify(this.grabFeriado);

    return this._http.post(url, body, httpOptions);
  }

  verificaFeriado(item) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.VERIFICA_FERIADO;
    const body = JSON.stringify(item);

    console.log('body', body);

    return this._http.post(url, body, httpOptions);
  }

  create(item) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.FERIADO;
    const body = JSON.stringify(item);

    return this._http.post(url, body, httpOptions);
  }

  update(id, item) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.FERIADO;
    const body = JSON.stringify(item);

    return this._http.put(url + '/' + id, body, httpOptions);
  }

  delete(id) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.FERIADO;

    return this._http.delete(url + '/' + id, httpOptions);
  }
}
