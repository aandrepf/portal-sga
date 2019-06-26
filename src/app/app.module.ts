import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';

/*---MÓDULOS---*/
import { routing } from './app.routing';
import { InterfaceModule } from './components/adm/interface/interface.module';
import { ApiConexaoModule } from './components/api-conexao/api-conexao.module';
import { DashboardModule } from './components/dash/dashboard.module';
import { FilaUnicaModule } from './components/adm/fila-unica/fila-unica.module';
import { IncidentesModule } from './components/adm/incidentes/incidentes.module';
import { FeriadoModule } from './components/adm/feriado/feriado.module';
import { RelFeriadoModule } from './components/adm/rel-feriado/rel-feriado.module';
import { UsuariosModule } from './components/adm/usuarios/usuarios.module';
import { PerfilUsuarioModule } from './components/perfil-usuario/perfil-usuario.module';
import { MenuModule } from './components/adm/menu/menu.module';
import { PerfilMenuModule } from './components/perfil-menu/perfil-menu.module';
import { PreviewInterfaceModule } from './components/adm/preview-interface/preview-interface.module';
import { MaterialModule } from './shared/material.module';
import { AbrangeFilaUnicaModule } from './components/abrange-fila-unica/abrange-fila-unica.module';

/*--COMPONENTES--*/
import { AppComponent } from './app.component';
import { AlertDialogComponent } from './utils/alert.dialog.component';

/*--SERVIÇOS--*/
import { InterfaceService } from './services/interface.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing,
    InterfaceModule,
    ApiConexaoModule,
    DashboardModule,
    FilaUnicaModule,
    IncidentesModule,
    FeriadoModule,
    RelFeriadoModule,
    UsuariosModule,
    PerfilUsuarioModule,
    MenuModule,
    PerfilMenuModule,
    PreviewInterfaceModule,
    AbrangeFilaUnicaModule
  ],
  providers: [
    InterfaceService,
    AuthService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  entryComponents: [
    AlertDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
