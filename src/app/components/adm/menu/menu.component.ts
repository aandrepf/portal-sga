
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public load = false;
  public selectedIndex = 0;
  public showTabs = false;
  public idMenuPai: number;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.load = true;
    }, 1500);
  }

  recebeIdMenuPai(id) {
    this.idMenuPai = id;
    this.showTabs = true;
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
