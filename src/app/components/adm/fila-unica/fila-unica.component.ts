import { UtilService } from './../../../services/util.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { CountCadastro } from './fila-unica-configs/fila-unica-configs.component';

@Component({
  selector: 'app-fila-unica',
  templateUrl: './fila-unica.component.html',
  styleUrls: ['./fila-unica.component.css']
})
export class FilaUnicaComponent implements OnInit {

  page: number;
  texto: string;
  selectedIndex = 0;
  showConfig = false;
  showCadastro = true;
  load = false;
  closePage = false;
  countCadastro: number;

  infoCadastro: CountCadastro;

  // Detecta quando o usuário sai da página
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: BeforeUnloadEvent) {

    this.infoCadastro = JSON.parse(localStorage.getItem('countCadastro'));

    if (this.selectedIndex !== 0 && this.infoCadastro.count === 0) {
      event.preventDefault();
      this.closePage = true;
      console.log('I am leaving this app...', this.closePage);
      // tslint:disable-next-line:max-line-length
      this._util.alertDialog('Alerta de Sistema:', '[ ' + this.infoCadastro.descricao + ' ] não contém filas vinculadas. Por favor, complete seu cadastro.');

      return false;
    }
  }

  constructor(private _route: Router, private _activeRoute: ActivatedRoute, private _util: UtilService) { }

  ngOnInit() {
    setTimeout(() => {
      this.load = true;
    }, 500);
  }

  recebeId(content) {
    this.page = content.idFilaUnica;
    this.texto = content.nomeFila;
    this.closePage = content.closedPage;

    this.selectedIndex = 1;
    this.showConfig = true;
    this.showCadastro = false;
  }

  back(dataCadastro: CountCadastro) {
    console.log(dataCadastro);
    this.selectedIndex = dataCadastro.tab;
    this.countCadastro = dataCadastro.count;

    if (dataCadastro.tab === 0) {
      this.showConfig = false;
      this.showCadastro = true;
    }
  }

  navigateAbrangencia() {
    const acParam = this._activeRoute.snapshot.queryParamMap.get('ac');
    const idParam = this._activeRoute.snapshot.queryParamMap.get('id');
    this._route.navigate(['/abrangencia-fu'], { queryParams: { ac: acParam, id: idParam } });
  }

  selectedTab(e) {
    this.selectedIndex = e.index;
    switch (this.selectedIndex) {
      case 0:
        this.showConfig = false;
      break;
    }
  }

}
