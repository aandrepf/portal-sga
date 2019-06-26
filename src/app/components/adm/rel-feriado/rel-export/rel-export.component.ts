import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnidadeFederacao, MunicipioByEstado, EnviaExportFeriado } from 'src/app/models/calendar.model';
import { FeriadoService } from 'src/app/services/feriado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { XlsDownloadService } from 'src/app/services/xls-download.service';

import { MatBottomSheet } from '@angular/material';
import { RelDownloadComponent } from './rel-download/rel-download.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rel-export',
  templateUrl: './rel-export.component.html',
  styleUrls: ['./rel-export.component.css']
})
export class RelExportComponent implements OnInit, OnDestroy {
  private _subsUf: Subscription;
  private _subsMunic: Subscription;
  private _subsExport: Subscription;

  public selectedClasse;
  public relatorioFrm: FormGroup;
  public estado: UnidadeFederacao[];
  public municipio: MunicipioByEstado[];
  public enviaExport: EnviaExportFeriado;

  public filename: string;
  public showDownloadButton = false;
  public invalid = true;
  public expandStatus = false;

  constructor(
    private bottomSheet: MatBottomSheet, private spinner: NgxSpinnerService,
    private _feriado: FeriadoService, private fb: FormBuilder, private _xlsxDownload: XlsDownloadService) {}

  ngOnInit() {
    this.relatorioFrm = this.fb.group({
      idClasse: ['', Validators.required],
      idTipo: ['', Validators.required],
      idEstado: [''],
      idCodMunic: ['']
    });

    this.getUF();
  }

  ngOnDestroy() {
    if (this._subsUf !== undefined) { this._subsUf.unsubscribe(); }
    if (this._subsMunic !== undefined) { this._subsMunic.unsubscribe(); }
    if (this._subsExport !== undefined) { this._subsExport.unsubscribe(); }
  }

  getUF() {
    this._subsUf = this._feriado.retornaUF().subscribe(
      (data: any[]) => {
        this.estado = data;
      },
      err => console.error('ERROR UF ===>', err)
    );
  }

  getMunicipio(estado: number) {
    if (estado === null) {
      return false;
    } else {
      this._subsMunic = this._feriado.retornaMunicipio(estado).subscribe(
        (data: any[]) => {
          this.municipio = data;
        },
        err => console.error('ERROR MUNIC ===>', err)
      );
    }
  }

  resetaForm() {
    this.relatorioFrm.setValue({
      idClasse: ['', Validators.required],
      idTipo: ['', Validators.required],
      idEstado: [''],
      idCodMunic: ['']
    });
    this.relatorioFrm.reset();
  }

  onSubmit() {
    this.enviaExport = new EnviaExportFeriado();
    this.enviaExport.idClasseFeriado = Number(this.relatorioFrm.value.idClasse);
    this.enviaExport.idTipoFeriado = Number(this.relatorioFrm.value.idTipo);

    if (this.enviaExport.idTipoFeriado === 1 || this.enviaExport.idTipoFeriado === 0) {
      this.enviaExport.idEstado = 0;
      this.enviaExport.idCodMunic = 0;
    } else if (this.enviaExport.idTipoFeriado === 2) {
      this.enviaExport.idEstado = this.relatorioFrm.value.idEstado;
      this.enviaExport.idCodMunic = 0;
    } else if (this.enviaExport.idTipoFeriado = 3) {
      this.enviaExport.idEstado = this.relatorioFrm.value.idEstado;
      this.enviaExport.idCodMunic = this.relatorioFrm.value.idCodMunic;
    }

    this._subsExport = this._xlsxDownload.generateFileToExport(this.enviaExport).subscribe(
      (exporta: any) => {

        const caminho = JSON.parse(exporta._body);

        this.expandStatus = false;
        this.relatorioFrm.reset();
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
          this.bottomSheet.open(RelDownloadComponent, { data: { caminhoDownload : caminho } });
        }, 1500);

      },
      err => console.error('ERRO', err)
    );
  }
}
