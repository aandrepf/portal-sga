import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FilaUnica } from 'src/app/models/filas.model';
import { FilasService } from 'src/app/services/filas.service';
import { FetchUnidade, Rede } from 'src/app/models/abrangencia.model';
import { AbrangenciaService } from './../../services/abrangencia.service';

@Component({
  selector: 'app-abrange-fila-unica',
  templateUrl: './abrange-fila-unica.component.html',
  styleUrls: ['./abrange-fila-unica.component.css']
})
export class AbrangeFilaUnicaComponent implements OnInit, OnDestroy {
  private _subsAbrange: Subscription;
  private _subsFilas: Subscription;
  private _subsEspalha: Subscription;
  private _subsRede: Subscription;
  private _subsRegional: Subscription;
  private _subsMunicipio: Subscription;
  private _subsAgencia: Subscription;

  public selected;
  public msg;
  public filas: FilaUnica[];
  public unidades: FetchUnidade;
  public redes: Rede[];
  public regional: Rede[];
  public municipio: Rede[];
  public agencia: Rede[];

  public abrangeForm = this.fb.group({
    rede: ['0', Validators.required],
    regional: ['0'],
    municipio: ['0'],
    agencia: ['0'],
    grupo: ['', Validators.required]
  });

  constructor(
    private _filas: FilasService,
    private _abrangencia: AbrangenciaService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private _route: Router,
    private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFilas();

    this.unidades = new FetchUnidade();

    this.montaRede();
  }

  ngOnDestroy() {
    if (this._subsAbrange !== undefined) { this._subsAbrange.unsubscribe(); }
    if (this._subsEspalha !== undefined) { this._subsEspalha.unsubscribe(); }
    if (this._subsFilas !== undefined) { this._subsFilas.unsubscribe(); }
    if (this._subsRede !== undefined) { this._subsRede.unsubscribe(); }
    if (this._subsRegional !== undefined) { this._subsRegional.unsubscribe(); }
    if (this._subsMunicipio !== undefined) { this._subsMunicipio.unsubscribe(); }
    if (this._subsAgencia !== undefined) { this._subsAgencia.unsubscribe(); }
  }

  getFilas() {
    this._subsFilas = this._filas.getCadastroFilas().subscribe(
      (data: FilaUnica[]) => {
        this.filas = data;
      }, err => console.error(err));
  }

  montaRede() {
    this.unidades.IdUnidadeRede = +this.abrangeForm.value.rede;
    this.unidades.IdUnidadeRegional = +this.abrangeForm.value.regional;
    this.unidades.IdMunicipio = +this.abrangeForm.value.municipio;
    this.unidades.IdUnidadeAgencia = +this.abrangeForm.value.agencia;

    this._subsRede = this._abrangencia.postRede(this.unidades).subscribe(
      (data: Rede[]) => {
        this.redes = data;
      }, err => console.error(err));
  }

  montaRegional(rede: string) {
    if (rede === '0') {
      if (this._subsRegional !== undefined) { this._subsRegional.unsubscribe(); }
      this.abrangeForm.setValue({
        rede: rede,
        regional: '0',
        municipio: '0',
        agencia: '0',
        grupo: this.abrangeForm.value.grupo
      });
    } else {
      this.regional = [];
      this.abrangeForm.setValue({
        rede: rede,
        regional: '0',
        municipio: '0',
        agencia: '0',
        grupo: this.abrangeForm.value.grupo
      });

      this.unidades.IdUnidadeRede = +rede;
      this.unidades.IdUnidadeRegional = +this.abrangeForm.value.regional;
      this.unidades.IdMunicipio = +this.abrangeForm.value.municipio;
      this.unidades.IdUnidadeAgencia = +this.abrangeForm.value.agencia;

      this._subsRegional = this._abrangencia.postRegional(this.unidades).subscribe(
        (data: Rede[]) => {
          this.regional = data;
        }, err => console.error(err));
    }
  }

  montaMunicipio(regional: string) {
    if (regional === '0') {
      if (this._subsMunicipio !== undefined) { this._subsMunicipio.unsubscribe(); }
      this.abrangeForm.setValue({
        rede: this.abrangeForm.value.rede,
        regional: regional,
        municipio: '0',
        agencia: '0',
        grupo: this.abrangeForm.value.grupo
      });
    } else {
      this.municipio = [];
      this.abrangeForm.setValue({
        rede: this.abrangeForm.value.rede,
        regional: regional,
        municipio: '0',
        agencia: '0',
        grupo: this.abrangeForm.value.grupo
      });

      this.unidades.IdUnidadeRede = +this.abrangeForm.value.rede;
      this.unidades.IdUnidadeRegional = +regional;
      this.unidades.IdMunicipio = +this.abrangeForm.value.municipio;
      this.unidades.IdUnidadeAgencia = +this.abrangeForm.value.agencia;

      this._subsMunicipio = this._abrangencia.postMunicipio(this.unidades).subscribe(
        (data: any[]) => {
          this.municipio = data;

        }, err => console.error(err));
    }
  }

  montaAgencia(municipio: string) {
    if (municipio === '0') {
      if (this._subsAgencia !== undefined) { this._subsAgencia.unsubscribe(); }
      this.abrangeForm.setValue({
        rede: this.abrangeForm.value.rede,
        regional: this.abrangeForm.value.regional,
        municipio: municipio,
        agencia: '0',
        grupo: this.abrangeForm.value.grupo
      });
    } else {
      this.agencia = [];
      this.abrangeForm.setValue({
        rede: this.abrangeForm.value.rede,
        regional: this.abrangeForm.value.regional,
        municipio: municipio,
        agencia: '0',
        grupo: this.abrangeForm.value.grupo
      });

      this.unidades.IdUnidadeRede = +this.abrangeForm.value.rede;
      this.unidades.IdUnidadeRegional = +this.abrangeForm.value.regional;
      this.unidades.IdMunicipio = +municipio;
      this.unidades.IdUnidadeAgencia = +this.abrangeForm.value.agencia;

      this._subsAgencia = this._abrangencia.postAgencia(this.unidades).subscribe(
        (data: Rede[]) => {
          this.agencia = data;
        }, err => console.error(err));
    }
  }


  navigateGrupo() {
    const acParam = this._activeRoute.snapshot.queryParamMap.get('ac');
    const idParam = this._activeRoute.snapshot.queryParamMap.get('id');
    this._route.navigate(['/adm-fila-unica'], { queryParams: { ac: acParam, id: idParam } });
  }

  resetaForm() {
    this.abrangeForm.setValue({
      rede: '0',
      regional: '0',
      municipio: '0',
      agencia: '0',
      grupo: ''
    });
  }

  onSubmit() {
    if (this.abrangeForm.value.rede === '0') {

      this.redes.forEach((rede: Rede, index: number, redes: Rede[]) => {

        this.unidades = new FetchUnidade();
        this.unidades.IdUnidadeRede = +rede.value;
        this.unidades.IdUnidadeRegional = 0;
        this.unidades.IdMunicipio = 0;
        this.unidades.IdUnidadeAgencia = 0;
        this.unidades.IdFilaUnica = +this.abrangeForm.value.grupo;

        this._subsEspalha = this._abrangencia.postEspalha(this.unidades).subscribe(
          (data: any) => {
            if (index === redes.length - 1) {
              if (data.retErro === 0) {
                this.snackBar.open(data.retMsg, '', { duration: 3000 });
              } else {
                this.snackBar.open(data.retMsg, '', { duration: 3000 });
              }
              this.resetaForm();
            }
          }, err => console.error(err));
        });

    } else {

      this.unidades = new FetchUnidade();
      this.unidades.IdUnidadeRede = +this.abrangeForm.value.rede;
      this.unidades.IdUnidadeRegional = +this.abrangeForm.value.regional;
      this.unidades.IdMunicipio = +this.abrangeForm.value.municipio;
      this.unidades.IdUnidadeAgencia = +this.abrangeForm.value.agencia;
      this.unidades.IdFilaUnica = +this.abrangeForm.value.grupo;

      this._subsEspalha = this._abrangencia.postEspalha(this.unidades).subscribe(
        (data: any) => {
          if (data.retErro === 0) {
            this.snackBar.open(data.retMsg, '', { duration: 3000 });
          } else {
            this.snackBar.open(data.retMsg, '', { duration: 3000 });
          }
          this.resetaForm();
        }, err => console.error(err));
    }
  }

}
