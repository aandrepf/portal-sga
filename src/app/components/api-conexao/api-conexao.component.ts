import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';
import { ConexaoService } from 'src/app/services/conexao.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AlertDialogComponent } from 'src/app/utils/alert.dialog.component';

export class ConnectionString {
  serverName: string;
  database: string;
  userId: string;
  password: string;
}

@Component({
  selector: 'app-api-conexao',
  templateUrl: './api-conexao.component.html',
  styleUrls: ['./api-conexao.component.css']
})
export class ApiConexaoComponent implements OnInit, OnDestroy {
  private _subsConexao: Subscription;

  msg = '';
  conexao: ConnectionString;
  load = false;

  conexaoForm = this.fb.group({
    ServerName: ['', Validators.required],
    Database: ['', Validators.required],
    UserId: ['', Validators.required],
    Password: ['', Validators.required]
  });

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private _conexao: ConexaoService,
    private _dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _authService: AuthService) {}

  ngOnInit() {
    // this.spinner.show();
    setTimeout(() => {
      const perfilUsuarioLogado = JSON.parse(localStorage.getItem('usuario')).perfilUsuario;
      console.log('Usuario ID ===>', perfilUsuarioLogado);
      if (perfilUsuarioLogado !== 'ADMIN') {
        this.alertLogin('Mensagem do sistema', 'Usuário sem permissão de acesso.');
      } else {
        this.load = true;
      }
      // this.spinner.hide();
    }, 100);
  }

  ngOnDestroy() {
    if (this._subsConexao !== undefined) { this._subsConexao.unsubscribe(); }
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

  resetaForm() {
    this.conexaoForm.setValue({
      ServerName: ['', Validators.required],
      Database: ['', Validators.required],
      UserId: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.conexaoForm.reset();
  }

  onSubmit() {
    this.conexao = new ConnectionString();
    this.conexao.serverName = this.conexaoForm.value.ServerName;
    this.conexao.database = this.conexaoForm.value.Database;
    this.conexao.userId = this.conexaoForm.value.UserId;
    this.conexao.password = this.conexaoForm.value.Password;

    this._subsConexao = this._conexao.createConnection(this.conexao).subscribe(
      (data: string) => {
        console.log('DATA RET.:', data);
        if (data.length === 0) {
          this.snackBar.open('O servidor não conseguiu encriptar a string de conexão', '', { duration: 3000 });
        } else {
          this.snackBar.open('String configurada', data.substring(0, 7), { duration: 3000 });
        }
        this.resetaForm();
      },
      err => {
        console.error('ERRO AO ENVIAR ', err);
        this.snackBar.open('Ocorreu algum erro ao tentar configurar a string de conexão', '', { duration: 3000 });
        this.resetaForm();
      }
    );
  }
}
