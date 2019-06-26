import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InterfaceService } from './interface.service';
import { GlobalFeriado } from '../shared/global-feriado';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RelFeriadoService {

  constructor(private _interface: InterfaceService, private _http: HttpClient) { }

  verificaFeriado(item) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.VERIFICA_FERIADO;
    const body = JSON.stringify(item);

    console.log('body', body);

    return this._http.post(url, body, httpOptions);
  }

  insertFeriado(item) {
    const url = this._interface.appConfig.urlAzureServer + GlobalFeriado.FERIADO;
    const body = JSON.stringify(item);

    console.log('body', body);

    return this._http.post(url, body, httpOptions);
  }
}
