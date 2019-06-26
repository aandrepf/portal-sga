import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { XlsDownloadService } from './../../../../services/xls-download.service';
import { saveAs } from './../../../../../../node_modules/file-saver/dist/FileSaver.min.js';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-rel-import',
  templateUrl: './rel-import.component.html',
  styleUrls: ['./rel-import.component.css']
})
export class RelImportComponent implements OnInit {
  @ViewChild('selectFile') selectFile: ElementRef;
  @Output() sendWS = new EventEmitter;
  @Output() sendSheets = new EventEmitter();

  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  // tslint:disable-next-line:no-inferrable-types
  sheetName: string = 'Template_Feriado.xlsx';
  fileName: string;
  display: string;


  constructor(private _xlsxDownload: XlsDownloadService) { }

  ngOnInit() {
  }

  download(arquivo: any) {
    this._xlsxDownload.downloadFile(arquivo)
    .subscribe((response: any) => {
      // traz o response como Blob, renomeia o arquivo e salva o mesmo
      const blob = response.blob();
      const file = new Blob([blob], {});
      saveAs(file, arquivo);
    },
    error => {
      console.log('O arquivo não existe');
    }, () => {});
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    // tslint:disable-next-line:curly
    if (target.files.length !== 1) throw new Error('Não pode usar multiplos arquivos');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'buffer'});

      this.sendWS.emit(wb.SheetNames);
      this.sendSheets.emit(wb.Sheets);

      this.fileName = this.selectFile.nativeElement.value.replace(/^.*\\/, '');
      this.display = 'block';
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  reset(): void {
    this.selectFile.nativeElement.value = '';
    this.display = 'none';
    this.sendWS.emit([]);
  }

}
