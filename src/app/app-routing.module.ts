import { LoginComponent } from './login/login.component';
import { Pagina2Component } from './pagina2/pagina2.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { Pag3Component } from './pag3/pag3.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'laudos/page2', component: Pagina2Component, canActivate: [AutenticacaoGuard] },
  { path: 'pag3', component: Pag3Component /*, canActivate: [AutenticacaoGuard]*/ },  // Faça um teste  com uma terceira rota

  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: ''}   // em caso de acessar url sem sentido

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], /* para evitar rotas do spring-boot */
  exports: [RouterModule]
})
export class AppRoutingModule { }
