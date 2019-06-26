import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterfaceService } from './interface.service';
import { GlobalAbrangencia } from './../shared/global-abrangencia';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AbrangenciaService {

  constructor(private _interface: InterfaceService, private _http: HttpClient) {}

  postRede(item: Object) {
    const url = `${this._interface.appConfig.urlHub}${GlobalAbrangencia.LER_REDE}`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }

  postRegional(item: Object) {
    const url = `${this._interface.appConfig.urlHub}${GlobalAbrangencia.LER_REGIONAL}`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }

  postMunicipio(item: Object) {
    const url = `${this._interface.appConfig.urlHub}${GlobalAbrangencia.LER_MUNICIPIO}`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }

  postAgencia(item: Object) {
    const url = `${this._interface.appConfig.urlHub}${GlobalAbrangencia.LER_AGENCIA}`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }

  postEspalha(item: Object) {
    const url = `${this._interface.appConfig.urlHub}${GlobalAbrangencia.ESPALHA_FU}`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }
}
