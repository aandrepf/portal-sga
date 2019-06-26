import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterfaceService } from './interface.service';
import { GlobalFilas } from '../shared/global-filas';
import { Usuario } from '../models/auth.model';
import { Subscription } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {
  public usuario: Usuario;

  private _subConfigApp: Subscription;

  constructor(private _interface: InterfaceService, private _http: HttpClient) {}

  sair() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    window.location.href = `${this._interface.appConfig.urlAuthentication}`;
  }

}
