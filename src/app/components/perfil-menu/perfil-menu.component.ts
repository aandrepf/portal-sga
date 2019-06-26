import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ENOperation } from 'src/app/models/enum';

@Component({
  selector: 'app-perfil-menu',
  templateUrl: './perfil-menu.component.html',
  styleUrls: ['./perfil-menu.component.css']
})
export class PerfilMenuComponent implements OnInit, OnDestroy {

  public load = false;

  constructor(
    private spinner: NgxSpinnerService, public dialog: MatDialog, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.load = true;
    }, 1500);
  }

  ngOnDestroy() {}

}
