import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../utils/alert.dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private _dialog: MatDialog) { }

  alertDialog(code: any, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AlertDialogComponent>;
    dialogRef = this._dialog.open(AlertDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.code = code;
    return dialogRef.afterClosed();
  }
}
