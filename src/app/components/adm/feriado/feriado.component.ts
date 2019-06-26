import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css']
})
export class FeriadoComponent implements OnInit {

  selectedIndex = 0;
  showTabs = false;
  load = false;
  dia = '';
  recebeEvt = [];
  classe;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.spinner.show();
    setTimeout(() => {
      // this.spinner.hide();
      this.load = true;
    }, 1500);
  }

  recebeDia(enviaeventos) {
    this.dia = enviaeventos.dia;
    this.recebeEvt = enviaeventos.evt;
    this.classe = enviaeventos.classe;
    this.showTabs = true;
    console.log('dia clicado home', this.dia);
  }

  selectedTab(e) {
    this.selectedIndex = e.index;
    switch (this.selectedIndex) {
      case 0:
        console.log('tab --->', e.index);
        this.showTabs = false;
      break;
    }
  }

}
