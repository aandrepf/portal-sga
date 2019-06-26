import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterfaceService } from 'src/app/services/interface.service';
import { Subscription } from 'rxjs';
import { GetPreview, Paginas } from 'src/app/models/interface.model';
import { Link, Botoes } from './../../../models/interface.model';

@Component({
  selector: 'app-preview-interface',
  templateUrl: './preview-interface.component.html',
  styleUrls: ['./preview-interface-itau.component.css']
})
export class PreviewInterfaceComponent implements OnInit, OnDestroy {
  private _subinscricao: Subscription;

  public id: string;
  public interface: Paginas;
  public acParam: string;
  public idParam: string;

  public links: Link[];
  public itemLinks: number;
  public botoes: Botoes[];
  public itemBotoes: number;

  constructor(private _interface: InterfaceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.acParam = this.route.snapshot.queryParamMap.get('ac');
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    this._subinscricao = this.route.params.subscribe((param: any) => {
      this.id = param['id'];
      console.log('valor do id ===>', this.id);
      this.geturls(this.id);
    });
  }

  ngOnDestroy() {
    this._subinscricao.unsubscribe();
  }

  geturls(id: any) {
    this._subinscricao = this._interface.previewInterface(id).subscribe(
      (data: GetPreview) => {
        this.interface = data.interfaceEmissorPagina;
        this.links = this.interface.interfaceEmissorLink;
        console.log('links', this.links);
        this.itemLinks = this.links.length;
        this.botoes = this.interface.interfaceEmissorBotao;
        console.log('botoes', this.botoes);
        this.itemBotoes = this.botoes.length;
      },
      err => console.error(err)
    );
  }

  getPosicaoTexto(posicao: number): string {
    switch (posicao) {
      case 1:
        return 'right';
      case 2:
        return 'center';
      case 3:
        return 'left';
    }
  }

  getTipoBotao(tipo: number): string {
    switch (tipo) {
      case 1:
        return 'atendimento';
      case 2:
        return 'gerencia';
      case 3:
        return 'prioritario';
    }
  }

  goBackHome() {
    this.router.navigate(['/adm-interface'], { queryParams: { 'ac': this.acParam, 'id': this.idParam } });
  }

}
