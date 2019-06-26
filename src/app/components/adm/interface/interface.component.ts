import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  page: number;
  load = false;

  linkid: number;
  link: any[];

  selectedIndex = 0;
  showTabs = false;
  showContentLinks = false;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.hide();
    setTimeout(() => {
      this.spinner.hide();
      this.load = true;
    }, 1500);
  }

  recebeId(id: number) {
    this.page = id;
    // this.selectedIndex = 1;
    this.showTabs = true;
  }

  recebeIdLink(envia) {
    console.log('envia links', envia);
    this.linkid = envia.id;
    this.link = envia.content;
    this.page = envia.page;
    // this.selectedIndex = 3;
    this.showContentLinks = true;
  }

  selectedTab(e) {
    this.selectedIndex = e.index;
    switch (this.selectedIndex) {
      case 0:
        console.log('tab --->', e.index);
        this.showTabs = false;
        this.showContentLinks = false;
      break;
      case 2:
        console.log('tab --->', e.index);
        this.showContentLinks = false;
      break;
    }
  }

}
