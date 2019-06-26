import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material.module';
import { PipesModule } from './../../../pipes/pipes.module';

import { XlsDownloadService } from 'src/app/services/xls-download.service';
import { FeriadoService } from 'src/app/services/feriado.service';

import { RelFeriadoComponent } from './rel-feriado.component';
import { RelImportComponent } from './rel-import/rel-import.component';
import { RelWorksheetsComponent } from './rel-worksheets/rel-worksheets.component';
import { RelExportComponent } from './rel-export/rel-export.component';
import { RelDownloadComponent } from './rel-export/rel-download/rel-download.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
  ],
  declarations: [
    RelFeriadoComponent,
    RelImportComponent,
    RelWorksheetsComponent,
    RelExportComponent,
    RelDownloadComponent
  ],
  exports: [
    RelFeriadoComponent
  ],
  providers: [
    XlsDownloadService,
    FeriadoService
  ],
  entryComponents: [
    RelDownloadComponent
  ]
})
export class RelFeriadoModule { }
