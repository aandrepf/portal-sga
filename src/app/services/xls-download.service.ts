import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { GlobalFeriado } from './../shared/global-feriado';
import { InterfaceService } from './interface.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { saveAs } from './../../../node_modules/file-saver/dist/FileSaver.min.js';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/application/vnd.ms-excel',
  })
};

@Injectable()
export class XlsDownloadService {
  private filePath = './assets/data';
  private fileExportXLSX = 'http://192.168.0.27:8080';

  constructor(private _http: Http, private _interface: InterfaceService, private http: HttpClient) { }

  downloadFile(file: string) {
    // definir as headers para o arquivo e o response serem Blob
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;

    return this._http.get(`${this.filePath}/${file}`, options)
      .pipe(
        map((res: Response) => res),
        catchError(error => throwError(error) )
      );
  }

  generateFileToExport(exportData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(exportData);

    const url = this._interface.appConfig.urlHub + GlobalFeriado.EXPORT_PLANILHA;

    return this._http.post(url, body, options);
  }

  downloadExportedFile(urlDownload: string): void {
    this.getFile(urlDownload)
    .subscribe(fileData => {
      const b = new Blob([fileData], {});
      const fileName = 'Relatorio_Feriados_' + formatDate(Date.now(), 'yyyyMMddHmmss', 'pt-BR') + '.xlsx';
      saveAs(b, fileName);
    });
  }

  public getFile(path: string): Observable<any> {
    const options = new RequestOptions({responseType: ResponseContentType.Blob});

    return this._http.get(path, options)
      .pipe(
        map((response: Response) => <Blob>response.blob())
      );
  }
}
