import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndingSessionComponent } from './redirecting/ending-session/ending-session.component';
import { PacientesHomeComponent } from './home-pacientes/pacientes-home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RedirectingComponent } from './redirecting/redirecting.component';
import { RedirectComponent } from './redirecting/redirect/redirect.component';
import { TesteDeComponentesComponent } from './testes/teste-de-componentes/teste-de-componentes.component';
import { PacienteComponent } from './paciente/paciente.component';
import { IdentificacaoComponent } from './paciente/perfil/generico/identificacao/identificacao.component';

const routes: Routes = [
  // Rotas do menu principal
  { path: 'login', component: LoginComponent },
  { path: 'home/pacientes', component: PacientesHomeComponent, canActivate: [AutenticacaoGuard] },
  { path: 'home/novo-paciente' , component: CadastroComponent, canActivate: [AutenticacaoGuard]},
  { path: 'teste', component: TesteDeComponentesComponent, canActivate: [AutenticacaoGuard]},


  // Rotas do paciente (Pai)
  {
    path: 'paciente', component: PacienteComponent, canActivate: [AutenticacaoGuard],
    children:[
      // rotas filhas da documentação aqui...

      // exemplo com identificacao
      { path: 'identificacao', component: IdentificacaoComponent }
    ]

  },



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
