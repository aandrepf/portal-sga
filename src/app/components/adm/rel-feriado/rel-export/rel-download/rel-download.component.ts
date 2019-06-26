import { Component, OnInit, Inject } from '@angular/core';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { XlsDownloadService } from 'src/app/services/xls-download.service';

@Component({
  selector: 'app-rel-download',
  templateUrl: './rel-download.component.html',
  styleUrls: ['./rel-download.component.css']
})
export class RelDownloadComponent implements OnInit {

  constructor(
    private _xlsxDownload: XlsDownloadService,
    private bottomSheetRef: MatBottomSheetRef<RelDownloadComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
    console.log('data check', this.data);
  }

  download() {
    this._xlsxDownload.downloadExportedFile(this.data.caminhoDownload);
    setTimeout(() => {
      this.bottomSheetRef.dismiss();
    }, 2000);
  }
}
