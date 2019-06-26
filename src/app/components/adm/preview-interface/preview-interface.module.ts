import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material.module';

import { PreviewInterfaceComponent } from './preview-interface.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PreviewInterfaceComponent
  ],
  exports: [
    PreviewInterfaceComponent
  ],
  entryComponents: [],
  providers: []
})
export class PreviewInterfaceModule { }
