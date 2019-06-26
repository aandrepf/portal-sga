import { CountCadastro } from './components/adm/fila-unica/fila-unica-configs/fila-unica-configs.component';

import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ActivatedRoute, Event as RouterEvent, NavigationStart, Route, Router } from '@angular/router';

import { Subscription, timer } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
import { InterfaceService } from './services/interface.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Usuario, CredencialUsuario } from './models/auth.model';
import { Config } from './models/config';
import { AlertDialogComponent } from './utils/alert.dialog.component';
import { AuthService } from './services/auth.service';
import { Global } from './models/global';

export class Credencial {
  ac: string;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UtilService]
})
export class AppComponent implements OnInit, OnDestroy {
  private _inscricao: Subscription;
  private _subUsuario: Subscription;
  private _subTimer: Subscription;

  public usuario: Usuario;
  public credentials: CredencialUsuario;

  public urls: Config;
  public load = true;

  infoCadastro: CountCadastro;

  ac: string;
  id: string;
  ticks: string;
  timer: any;
  isLogado: boolean;
  caminho: string;
  private getAuthUrl(): string {
    this.ac = this._route.snapshot.queryParamMap.get('ac');
    this.id = this._route.snapshot.queryParamMap.get('id');
    if(this.id === null || this.ac === null) {
      this._authService.sair();
    }
    this.credentials.credencial = String('ac=' + this.ac + '&id=' + this.id);
    const url =  `${this._interface.appConfig.urlAzureServer}${Global.IS_LOGADO_ITAU}`;
    return url;
  }

  constructor(
    private eRef: ElementRef,
    private _interface: InterfaceService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService,
    private _util: UtilService,
    private _dialog: MatDialog) {
      route.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.configUrls();
    this.infoCadastro = new CountCadastro();
    this.credentials = new CredencialUsuario();
    this.usuario = new Usuario();
    this.usuario.nome = 'não identificado';
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.getAuthUrl();
      this.loadUsuario();
    }, 500);
  }

  ngOnDestroy() {
    if (this._inscricao !== undefined) { this._inscricao.unsubscribe(); }
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.caminho = event.url.split('?')[0];
      console.log(this.caminho);
    }
  }

  configUrls() {
    this._inscricao = this._interface.getUrls().subscribe(
      data => {
        this.urls = data[0];
        sessionStorage.setItem('urls', JSON.stringify(this.urls));
        this.timer = timer(0, 120 * 1000);
      },
      err => console.error(err),
      () => console.log('carregou as urls')
    );
  }

  loadUsuario() {
    this._subUsuario = this._interface.getCredentials(this.getAuthUrl(), this.credentials).subscribe(
      (data: Usuario) => {
        this.usuario = data;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.isLogado = this.usuario.isUsuarioLogado;
          console.log('Usuário logado?', this.isLogado);
          if (this.isLogado === true) {
            this.usuario.nome = this.usuario.nome;

            if (this.caminho === '/dash' || this.caminho === '/portal' || this.caminho === '/') {
              return;
            } else {
              this._subTimer = this.timer.subscribe((t: any) => {
                this.tickerFunc(t);
              });
            }

          } else {
            this.alertLogin('Mensagem do sistema', 'Usuário não está logado');
          }
      },
      err => {
        if (this.ac !== null || this.id !== null){
          this._util.alertDialog('Erro de Sistema:', 'Servidor Indisponível');
        }

        throw err;
      });
  }

  tickerFunc(tick: any) {
    const ticksDate = new Date(0, 0, 0, 0, 0, tick, 0);
    this.ticks = ticksDate.toString();
    this.ticks = this.ticks.substring(16, 24);
    console.log('tick login');
    this._subUsuario = this._interface.getCredentials(this.getAuthUrl(), this.credentials).subscribe((data: Usuario) => {
      this.usuario = data;
      if (this.usuario.isUsuarioLogado === false) {
        this.alertLogin('Mensagem do sistema:', 'Sua sessão expirou!');
      }
    }, error => {
      this._util.alertDialog('Erro de Sistema:', 'Servidor Indisponível');
      throw error;
    });
  }

  alertLogin(code: any, message: string) {
    let dialogRef: MatDialogRef<AlertDialogComponent>;
    dialogRef = this._dialog.open(AlertDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.code = code;
    dialogRef.afterClosed().subscribe(() => {
      this._authService.sair();
    });
  }

  logout() {
    localStorage.removeItem('countCadastro');
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('urls');
    this.ac = this._route.snapshot.queryParamMap.get('ac');
    this.id = this._route.snapshot.queryParamMap.get('id');
    this.credentials.credencial = String('ac=' + this.ac + '&id=' + this.id);
    if (this.ac === null || this.id === null) {
      window.location.href = `${this._interface.appConfig.urlAuthentication}`;
    }
    window.location.href = `${this._interface.appConfig.urlApplication}` + '?' + `${this.credentials.credencial}`;
  }
}
