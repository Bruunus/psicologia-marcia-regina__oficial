import { LoginComponent } from './login/login.component';
import { Pagina2Component } from './pagina2/pagina2.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: 'redirect', component: RedirectComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginComponent] },
  { path: 'laudos/page2', component: Pagina2Component },

  { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], /* para evitar rotas do spring-boot */
  exports: [RouterModule]
})
export class AppRoutingModule { }
