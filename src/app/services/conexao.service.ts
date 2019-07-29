import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../models/global';
import { InterfaceService } from './interface.service';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

  constructor(private _http: HttpClient, private _interface: InterfaceService) { }

  createConnection(conexao: Object) {
    const url = this._interface.appConfig.urlHub + Global.API_CONNECTION;
    const body = JSON.stringify(conexao);

    return this._http.post(url, body, httpOptions);
  }
}
