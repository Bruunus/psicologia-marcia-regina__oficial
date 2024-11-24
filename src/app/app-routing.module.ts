import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndingSessionComponent } from './services/redirecting/ending-session/ending-session.component';
import { PacientesHomeComponent } from './home-pacientes/pacientes-home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RedirectingComponent } from './services/redirecting/redirecting.component';
import { RedirectComponent } from './services/redirecting/redirect/redirect.component';
import { TesteDeComponentesComponent } from './testes/teste-de-componentes/teste-de-componentes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pacientes', component: PacientesHomeComponent, canActivate: [AutenticacaoGuard] },
  { path: 'novo-paciente' , component: CadastroComponent, canActivate: [AutenticacaoGuard]},
  { path: 'teste', component: TesteDeComponentesComponent, canActivate: [AutenticacaoGuard]},





  { path: 'redirect-home', component: RedirectComponent, canActivate: [AutenticacaoGuard] },
  // { path: 'rederect', component: RedirectingComponent, canActivate: [AutenticacaoGuard] },
  { path: 'ending-session', component: EndingSessionComponent, canActivate: [AutenticacaoGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full'},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
  // { path: '**', redirectTo: '/login' , canActivate: [AutenticacaoGuard]}   // em caso de acessar url sem sentido

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], /* para evitar rotas do spring-boot */
  exports: [RouterModule]
})
export class AppRoutingModule { }
