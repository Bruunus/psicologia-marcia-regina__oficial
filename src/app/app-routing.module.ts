import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pag3Component } from './pag3/pag3.component';
import { RedirectComponent } from './services/redirecting/redirect/redirect.component';
import { EndingSessionComponent } from './services/redirecting/ending-session/ending-session.component';
import { PacientesHomeComponent } from './home-pacientes/pacientes-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pacientes', component: PacientesHomeComponent, canActivate: [AutenticacaoGuard] },
  { path: 'page3', component: Pag3Component , canActivate: [AutenticacaoGuard] },
  { path: 'authenticating', component: RedirectComponent, canActivate: [AutenticacaoGuard] },
  { path: 'ending-session', component: EndingSessionComponent, canActivate: [AutenticacaoGuard] },

  { path: '**', redirectTo: '/login', pathMatch: 'full'}
  // { path: '**', redirectTo: '/login' , canActivate: [AutenticacaoGuard]}   // em caso de acessar url sem sentido

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], /* para evitar rotas do spring-boot */
  exports: [RouterModule]
})
export class AppRoutingModule { }
