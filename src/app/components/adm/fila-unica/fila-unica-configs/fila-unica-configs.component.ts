import { GlobalFilas } from 'src/app/shared/global-filas';
import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit, Input, OnChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FilasService } from 'src/app/services/filas.service';
import { GrupoFilas, Filas } from './../../../../models/filas.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

export class CountCadastro {
  tab: number;
  count: number;
  descricao: string;
}

@Component({
  selector: 'app-fila-unica-configs',
  templateUrl: './fila-unica-configs.component.html',
  styleUrls: ['./fila-unica-configs.component.css'],
  providers: [DragulaService]
})
export class FilaUnicaConfigsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() idPagina: number;
  @Input() descricao: string;
  @Input() indexTab: number;
  @Input() fechaTela: boolean;
  @Output() save = new EventEmitter();

  private _getGrupoFilas: Subscription;
  private _getFilas: Subscription;
  private _createGroup: Subscription;

  id;
  cadastro: any[] = [];
  newCadastro = [];
  defaultFilas: Filas[] = [];
  filasSelecionadas: GrupoFilas;
  filas: Filas;
  infoConfig: CountCadastro;
  grupoCriado: any;

  constructor(private _dragula: DragulaService, private _filas: FilasService, public snackBar: MatSnackBar,
    private _util: UtilService) {
    this._dragula.createGroup('filas', {
      revertOnSpill: true,
      removeOnSpill: false,
      accepts: (target) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      }
    });
  }

  ngOnChanges() {
    if (this.fechaTela === true) {
      return false;
    } else {
      if (this.idPagina !== undefined && this.descricao !== undefined && this.indexTab === 1) {
        this.infoConfig = new CountCadastro();
        this.infoConfig.descricao = this.descricao;
        this.infoConfig.tab = this.indexTab;

        this.listaFilas(this.idPagina);
        this._getGrupoFilas = this._dragula.drop('filas').subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          (data: any) => {
            const inicio = data.source.className.substring(28, 10);
            const alvo = data.target.className.substring(28, 10);
            const idCat = +data.el.innerText.substring(0, 2).trim();

            if (inicio === alvo) {
              console.log('SE MOVEU NO MESMO BOX');
              return false;
            } else {
              console.log('SE MOVEU DE BOX DIFERENTES');
              switch (alvo) {
                case 'box-ticket-custom':
                  this.insereGrupoFila(idCat);
                break;
                case 'box-ticket-default':
                  this.removeGrupoFila(idCat);
                break;
              }
            }
        });
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._getFilas !== undefined) { this._getFilas.unsubscribe(); }
    if (this._getGrupoFilas !== undefined) { this._getGrupoFilas.unsubscribe(); }
  }

  listaFilas(id: number) {
    this._getFilas = this._filas.getFilas().subscribe(
    (data: Filas[]) => {
      this.defaultFilas = data;

      console.log('filas', this.defaultFilas);

      this._getGrupoFilas = this._filas.getGrupoFilas().subscribe(
      (dados: GrupoFilas[]) => {
        const cadastro = dados.filter(x => x.idFilaUnica === id);

        console.log('fechou a tela?', this.fechaTela);

        if (cadastro.length === 0) {
          this.infoConfig.count = this.cadastro.length;
          localStorage.setItem('countCadastro', JSON.stringify(this.infoConfig));
          this.cadastro = [];
        } else {
          this.cadastro = cadastro;
          this.infoConfig.count = this.cadastro.length;
          localStorage.setItem('countCadastro', JSON.stringify(this.infoConfig));
          for (const key of this.cadastro) {
            this.defaultFilas = this.defaultFilas.filter(item => item.idCategoria !== key.idCategoria);
          }
        }
      },
      err => console.error('ERRO OCORRIDO --->', err));
    });
  }

  insereGrupoFila(categoria: number) {
    this._getFilas = this._filas.getFilas().subscribe(
    (data: Filas[]) => {
      const fila = data.filter(item => item.idCategoria === categoria)[0];
      this.filasSelecionadas = new GrupoFilas();
      this.filasSelecionadas.idGrupoFila = 0;
      this.filasSelecionadas.idFilaUnica = this.idPagina;
      this.filasSelecionadas.idCategoria = fila.idCategoria;
      this.filasSelecionadas.nomeFila = fila.nomeFila;

      this.infoConfig.count = this.cadastro.length;
      localStorage.setItem('countCadastro', JSON.stringify(this.infoConfig));

      if (this.idPagina !== 0) {
        this._getGrupoFilas = this._filas.createGrupoFilas(this.filasSelecionadas)
        .subscribe(() => {
          this.snackBar.open('FILA INSERIDA COM SUCESSO', String(categoria), { duration: 2500 });
          console.log('GRUPO LISTA depois de inserir', this.cadastro);
        }, error => console.log('Erro no cadastro da Fila', error));
      } else {
        console.log('GRUPO LISTA depois de inserir', this.cadastro);
      }

    },
    err => console.error('ERRO OCORRIDO NA LISTAGEM --->', err));
  }

  removeGrupoFila(categoria: number) {
    this._getGrupoFilas = this._filas.getGrupoFilas().subscribe(
    (dados: GrupoFilas[]) => {
      const remove = dados.filter(x => x.idCategoria === categoria)[0];

      console.log('GRUPO LISTA depois de remover', this.cadastro);

      this.infoConfig.count = this.cadastro.length;
      localStorage.setItem('countCadastro', JSON.stringify(this.infoConfig));

      if (this.idPagina !== 0) {
        if (this.cadastro.length === 0) {
          // tslint:disable-next-line:max-line-length
          this._util.alertDialog('Alerta do Sistema:', '[' +  this.descricao + '] não pode ser vazio. Por favor insira pelo menos uma fila no grupo para salvar o cadastro.');
          this._getGrupoFilas = this._filas.deleteGrupoFilas(remove.idGrupoFila)
          .subscribe(() => {}, error => console.log('Erro na remoção da Fila', error));
        } else {
          this._getGrupoFilas = this._filas.deleteGrupoFilas(remove.idGrupoFila)
          .subscribe(() => {
            this.snackBar.open('FILA REMOVIDA COM SUCESSO', String(categoria), { duration: 2500 });
          }, error => console.log('Erro na remoção da Fila', error));
        }
      } else {
        if (this.cadastro.length === 0) {
          // tslint:disable-next-line:max-line-length
          this._util.alertDialog('Alerta do Sistema:', '[' +  this.descricao + '] não pode ser vazio. Por favor insira pelo menos uma fila no grupo para salvar o cadastro.');
        }
      }

    },
    err => console.error('ERRO OCORRIDO NO AGRUPAMENTO--->', err));
  }

  salvarFilas() {
    const dataSend = new CountCadastro();
    dataSend.tab = 0;
    dataSend.count = this.cadastro.length;

    if (dataSend.count === 0) {
      return false;
    } else {
      if (this.idPagina === 0) {
        this._createGroup = this._filas.createFilas(GlobalFilas.GRUPO_IDENTIFICACAO).subscribe(
          (result: any) => {
            this.grupoCriado = result;
          },
          (error) => console.error('ERRO AO CRIAR GRUPO', error),
          () => {
            this.filasSelecionadas = new GrupoFilas();
            for (const dados of this.cadastro) {
              this.filasSelecionadas.idGrupoFila = 0;
              this.filasSelecionadas.idFilaUnica = this.grupoCriado.idFilaUnica;
              this.filasSelecionadas.idCategoria = dados.idCategoria;
              this.filasSelecionadas.nomeFila = dados.nomeFila;

              this._getGrupoFilas = this._filas.createGrupoFilas(this.filasSelecionadas)
              .subscribe(() => {},
                error => console.log('Erro no cadastro da Fila', error));
            }

            this.snackBar.open('Grupo criado com sucesso', this.descricao, { duration: 2500 });
            setTimeout(() => {
              this.save.emit(dataSend);
            }, 1000);
          }
        );
      } else {
        this.save.emit(dataSend);
        this.snackBar.open('Grupo atualizado com sucesso', this.descricao, { duration: 2500 });
      }
    }
  }
}
