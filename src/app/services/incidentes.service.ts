import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class IncidentesService {
  public urlStatus = 'http://localhost:3000/IncidenteStatus';
  public urlIncidentes = 'http://localhost:3000/Incidente';
  public urlTipoEquipamento = 'http://localhost:3000/TipoEquipamento';
  public urlItemEquipamento = 'http://localhost:3000/ItemEquipamento';
  public urlUnidades = 'http://localhost:3000/Unidades';

  constructor(private _http: HttpClient) { }

  retornaStatus() { return this._http.get(this.urlStatus); }
  retornaIncidentes() { return this._http.get(this.urlIncidentes); }
  retornaItemEquipamento() { return this._http.get(this.urlItemEquipamento); }
  retornaTipoEquipamento() { return this._http.get(this.urlTipoEquipamento); }
  retornaUnidades() { return this._http.get(this.urlUnidades); }

  create(url, item) {
    const body = JSON.stringify(item);
    console.log('body', body);
    return this._http.post(url, body, httpOptions);
  }

  update(url, id, item) {
    const body = JSON.stringify(item);
    console.log('body', body);
    return this._http.put(url + '/' + id, body, httpOptions);
  }

  delete(url, id) {
    return this._http.delete(url + '/' + id, httpOptions);
  }
}
