import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rel-feriado',
  templateUrl: './rel-feriado.component.html',
  styleUrls: ['./rel-feriado.component.css']
})
export class RelFeriadoComponent implements OnInit {
  @Input() valorTab;

  load = false;
  selectedIndex = 0;
  showTabs = false;
  listaWS: any[];
  listaSheets: any[];

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.spinner.show();
    setTimeout(() => {
      // this.spinner.hide();
      this.load = true;
    }, 1500);
  }

  getWS(evento) {
    this.listaWS = evento.slice(0, 3);
    // console.log('listaWS', this.listaWS);
  }

  getSheets(evento) {
    this.listaSheets = evento;
    // console.log('listaSheets', this.listaSheets);
  }

  selectedTab(e) {
    this.selectedIndex = e.index;
    switch (this.selectedIndex) {
      case 0:
        console.log('tab --->', e.index);
        this.showTabs = false;
        this.listaWS = [];
      break;
    }
  }
}
