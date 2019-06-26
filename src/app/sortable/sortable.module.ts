import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SortableTableDirective } from './sortable-table.directive';
import { SortableService } from './sortable.service';
import { SortableColumnComponent } from './sortable-column.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [
    SortableTableDirective,
    SortableColumnComponent
  ],
  exports: [
    SortableTableDirective,
    SortableColumnComponent
  ],
  providers: [
    SortableService
  ]
})
export class SortableModule {}
