import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterfaceService } from './interface.service';
import { GlobalFilas } from '../shared/global-filas';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FilasService {

  constructor(private _interface: InterfaceService, private _http: HttpClient) {}

  /* CATEGORIAS */
  getFilas() {
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.GET_CATEGORIAS}`;
    return this._http.get(url);
  }

  /* SERVIÇOS DE CADASTRO DE FILAS UNICAS */
  getCadastroFilas() {
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU}`;
    return this._http.get(url);
  }

  createFilas(item) {
    const body = JSON.stringify(item);
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU}`;

    return this._http.post(url, body, httpOptions);
  }

  updateFilas(id, item) {
    const body = JSON.stringify(item);
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU}/${id}`;
    return this._http.put(url, body, httpOptions);
  }

  deleteFilas(id) {
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU}/${id}`;
    return this._http.delete(url, httpOptions);
  }

  /* SERVIÇOS DE CONFIGURAÇÃO DE GRUPOS DE FILA UNICA */
  getGrupoFilas() {
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU_G}`;
    return this._http.get(url);
  }

  createGrupoFilas(item) {
    const body = JSON.stringify(item);
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU_G}`;

    return this._http.post(url, body, httpOptions);
  }

  deleteGrupoFilas(id) {
    const url = `${this._interface.appConfig.urlAzureServer}${GlobalFilas.API_FU_G}/${id}`;
    return this._http.delete(url, httpOptions);
  }
}
