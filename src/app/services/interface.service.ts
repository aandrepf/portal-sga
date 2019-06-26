import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../models/global';
import { GlobalInterface } from './../shared/global-interface';
import { Config } from '../models/config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class InterfaceService {
  public appConfig: Config;

  constructor(private _http: HttpClient) {
    setTimeout(() => {
      this.appConfig = JSON.parse(sessionStorage.getItem('urls'));
    }, 500);
  }

  getUrls() {
    return this._http.get(Global.CONFIG);
  }

  getCredentials(url: string , credencial: any) {
    const body = JSON.stringify(credencial);
    return this._http.post(url, body, httpOptions);
  }

  getPaginas() {
    const url = this.appConfig.urlAzureServer + GlobalInterface.PAGINAS;
    return this._http.get(url);
  }

  getTitulos(id: number) {
    const url = this.appConfig.urlAzureServer + GlobalInterface.TITULOS + '/' + id;
    return this._http.get(url);
  }

  getLinks(id: number) {
    const url = this.appConfig.urlAzureServer + GlobalInterface.LINKS + '/' + id;
    return this._http.get(url);
  }

  getTituloLinks(id: number, link: number) {
    const url = this.appConfig.urlAzureServer + GlobalInterface.TITULO_LINKS + '/' + id + '/' + link;
    return this._http.get(url);
  }

  getBotoes(id: number) {
    const url = this.appConfig.urlAzureServer + GlobalInterface.BOTOES + '/' + id;
    return this._http.get(url);
  }

  listaBotoes(id: number) {
    const url = this.appConfig.urlAzureServer + GlobalInterface.LISTA_BOTOES + '/' + id;
    return this._http.post(url, '', httpOptions);
  }

  previewInterface(id: number) {
    const url = this.appConfig.urlAzureServer + GlobalInterface.PREVIEW + '/' + id;
    return this._http.get(url);
  }

  /* ---- FUNÇÕES QUE FAZEM AS REQUISIÇÕES ---- */
  create(url, item) {
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }
}
