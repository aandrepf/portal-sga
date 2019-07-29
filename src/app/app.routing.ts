import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardHomeComponent } from './components/dash/dashboard-home/dashboard-home.component';
import { InterfaceComponent } from './components/adm/interface/interface.component';
import { PreviewInterfaceComponent } from './components/adm/preview-interface/preview-interface.component';
import { ApiConexaoComponent } from './components/api-conexao/api-conexao.component';
import { FilaUnicaComponent } from './components/adm/fila-unica/fila-unica.component';
import { AbrangeFilaUnicaComponent } from './components/abrange-fila-unica/abrange-fila-unica.component';
import { IncidentesComponent } from './components/adm/incidentes/incidentes.component';
import { FeriadoComponent } from './components/adm/feriado/feriado.component';
import { RelFeriadoComponent } from './components/adm/rel-feriado/rel-feriado.component';
import { UsuariosComponent } from './components/adm/usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { MenuComponent } from './components/adm/menu/menu.component';
import { PerfilMenuComponent } from './components/perfil-menu/perfil-menu.component';

const appRoutes: Routes = [
  /*
    { path: 'dash', component: DashboardHomeComponent },
    { path: 'adm-interface', component: InterfaceComponent },
    { path: 'abrangencia-fu', component: AbrangeFilaUnicaComponent },
    { path: 'adm-fila-unica', component: FilaUnicaComponent },
    { path: 'preview-interface/:id', component: PreviewInterfaceComponent },
    { path: 'adm-fila-unica', component: FilaUnicaComponent },
    { path: 'abrangencia-fu', component: AbrangeFilaUnicaComponent },
    { path: 'api-conexao', component: ApiConexaoComponent },
    { path: 'perfil-menu', component: PerfilMenuComponent },
    { path: 'perfil-usuario', component: PerfilUsuarioComponent },
    { path: 'adm-usuarios', component: UsuariosComponent },
    { path: 'adm-menu', component: MenuComponent },
    { path: 'adm-rel-feriado', component: RelFeriadoComponent },
    { path: 'adm-feriado', component: FeriadoComponent },
    { path: 'adm-incidentes', component: IncidentesComponent },
  */
  { path: 'api-conexao', component: ApiConexaoComponent },
  { path: 'dash', component: DashboardHomeComponent },
  { path: 'adm-interface', component: InterfaceComponent },
  { path: 'preview-interface/:id', component: PreviewInterfaceComponent },
  { path: '**', redirectTo: 'dash'},
  { path: '', redirectTo: 'dash', pathMatch: 'full'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
