import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MenuComponent } from './menu.component';

import { MenuService } from 'src/app/services/menu.service';
import { MenuDialogComponent } from './menu-pai/menu-dialog/menu-dialog.component';
import { MenuPaiComponent } from './menu-pai/menu-pai.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { SubMenuDialogComponent } from './sub-menu/sub-menu-dialog/sub-menu-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    MenuComponent,
    MenuDialogComponent,
    MenuPaiComponent,
    SubMenuComponent,
    SubMenuDialogComponent
  ],
  exports: [
    MenuComponent
  ],
  entryComponents: [
    MenuDialogComponent,
    SubMenuDialogComponent
  ],
  providers: [MenuService]
})
export class MenuModule { }
