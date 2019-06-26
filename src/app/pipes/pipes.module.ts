import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatPipe } from './format.pipe';
import { SelectBoxPipe } from './select-box.pipe';
import { OrderByPipe } from './orderby.pipe';
import { SectohmsPipe } from './sectohms.pipe';
import { DecformatPipe } from './decformat.pipe';
import { ZeronleftPipe } from './zeronleft.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormatPipe,
    SelectBoxPipe,
    OrderByPipe,
    SectohmsPipe,
    DecformatPipe,
    ZeronleftPipe
  ],
  exports: [
    FormatPipe,
    SelectBoxPipe,
    OrderByPipe,
    SectohmsPipe,
    DecformatPipe,
    ZeronleftPipe
  ]
})
export class PipesModule { }
