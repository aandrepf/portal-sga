import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

import { AbrangeFilaUnicaComponent } from './abrange-fila-unica.component';
import { AbrangenciaService } from 'src/app/services/abrangencia.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AbrangeFilaUnicaComponent
  ],
  exports: [
    AbrangeFilaUnicaComponent
  ],
  providers: [AbrangenciaService]
})
export class AbrangeFilaUnicaModule { }
