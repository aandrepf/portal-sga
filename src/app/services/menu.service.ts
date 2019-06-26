import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class MenuService {
  private url_menu = 'http://localhost:3000/Menu';

  constructor(private _http: HttpClient) { }

  getMenu() { return this._http.get(this.url_menu); }

  create(item) {
    const body = JSON.stringify(item);
    console.log('body', body);
    return this._http.post(this.url_menu, body, httpOptions);
  }

  update(id, item) {
    const body = JSON.stringify(item);
    console.log('body', body);
    return this._http.put(this.url_menu + '/' + id, body, httpOptions);
  }

  delete(id) {
    return this._http.delete(this.url_menu + '/' + id, httpOptions);
  }
}
