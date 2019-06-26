import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'app-alert-dialog',
    template: `
        <p><strong>{{ code }}</strong></p>
        <p>{{ message }}</p>
        <br/>
        <div style="float:right;">
            <button type="button" mat-raised-button color="primary"
            (click)="dialogRef.close()">Fechar</button>
        </div>
    `,
})
export class AlertDialogComponent {

    public title: string;
    public message: string;
    public code: number;

    constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {}

}
