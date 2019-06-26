import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UsuarioService {
  private url_perfil = 'http://localhost:3000/PerfilUsuario';
  private url_nu = 'http://localhost:3000/NivelUnidade';

  constructor(private _http: HttpClient) {}

  getNU() { return this._http.get(this.url_nu); }
  getPerfilUsuario() { return this._http.get(this.url_perfil); }

  create(item) {
    const body = JSON.stringify(item);
    console.log('body', body);
    return this._http.post(this.url_perfil, body, httpOptions);
  }

  update(id, item) {
    const body = JSON.stringify(item);
    console.log('body', body);
    return this._http.put(this.url_perfil + '/' + id, body, httpOptions);
  }

  delete(id) {
    return this._http.delete(this.url_perfil + '/' + id, httpOptions);
  }
}
