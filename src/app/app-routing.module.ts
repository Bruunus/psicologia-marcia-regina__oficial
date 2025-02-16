import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndingSessionComponent } from './redirecting/ending-session/ending-session.component';
import { PacientesHomeComponent } from './home-pacientes/pacientes-home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RedirectingComponent } from './redirecting/redirecting.component';
import { RedirectComponent } from './redirecting/redirect/redirect.component';
import { TesteDeComponentesComponent } from './temp/teste-de-componentes/teste-de-componentes.component';
import { PacienteComponent } from './paciente/paciente.component';
import { IdentificacaoComponent } from './paciente/perfil/generico/identificacao/identificacao.component';
import { AcompanhamentoComponent } from './paciente/perfil/generico/acompanhamento/acompanhamento.component';
import { RelatorioComponent } from './paciente/perfil/generico/relatorio/relatorio.component';
import { FinanceiroComponent } from './paciente/perfil/generico/financeiro/financeiro.component';
import { LaudoComponent } from './paciente/perfil/neuropsicologia/laudo/laudo.component';
import { AgendarConsultaComponent } from './paciente/perfil/generico/agendar-consulta/agendar-consulta.component';
import { MigrarPacienteComponent } from './paciente/perfil/generico/migrar-paciente/migrar-paciente.component';
import { FinalizarTratamentoComponent } from './paciente/perfil/generico/finalizar-tratamento/finalizar-tratamento.component';
import { BugsComponent } from './temp/bugs/bugs.component';
import { IdentificacaoUpdateComponent } from './paciente/perfil/generico/editar-atualizar/identificacao/identificacao-update/identificacao-update.component';

const routes: Routes = [
  // Rotas do menu principal
  { path: 'login', component: LoginComponent },
  { path: 'home/pacientes', component: PacientesHomeComponent, canActivate: [AutenticacaoGuard] },
  { path: 'home/novo-paciente' , component: CadastroComponent, canActivate: [AutenticacaoGuard]},
  { path: 'teste', component: TesteDeComponentesComponent, canActivate: [AutenticacaoGuard]},
  { path: 'bugs', component: BugsComponent, canActivate: [AutenticacaoGuard]},


  // Rotas do paciente (Pai)
  {
    path: 'paciente/:perfil/documentos',
    component: PacienteComponent,
    canActivate: [AutenticacaoGuard],
    children:[
      // rotas filhas da documentação aqui...
      { path: 'identificacao', component: IdentificacaoComponent },
      { path: 'acompanhamento', component: AcompanhamentoComponent },
      { path: 'relatorio', component: RelatorioComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'laudo', component: LaudoComponent },
      { path: 'agendar-consulta', component: AgendarConsultaComponent },
      { path: 'migrar-paciente', component: MigrarPacienteComponent },
      { path: 'finalizar-tratamento', component: FinalizarTratamentoComponent },
      { path: 'atualizar', component: IdentificacaoUpdateComponent }


    ]

  },





  { path: 'redirect-home', component: RedirectComponent, canActivate: [AutenticacaoGuard] },
  // { path: 'rederect', component: RedirectingComponent, canActivate: [AutenticacaoGuard] },
  { path: 'ending-session', component: EndingSessionComponent, canActivate: [AutenticacaoGuard] },

  { path: '**', redirectTo: '/login', pathMatch: 'full'},
  { path: '', redirectTo: '/home/pacientes', pathMatch: 'full'}


  /*
    Para produção deixar nesta configuração

    { path: '**', redirectTo: '/home/pacientes', pathMatch: 'full'},
    { path: '', redirectTo: '/login', pathMatch: 'full'}

  */


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], /* para evitar rotas do spring-boot */
  exports: [RouterModule]
})
export class AppRoutingModule { }
