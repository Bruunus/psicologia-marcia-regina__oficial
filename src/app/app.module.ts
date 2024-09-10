import { Providers } from './Providers';
import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { AutenticacaoService } from './login/autenticacao.service';
import { Pagina2Component } from './pagina2/pagina2.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from './services/redirecting/redirect/redirect.component';

import { Pag3Component } from './pag3/pag3.component';
import { RedirectingComponent } from './services/redirecting/redirecting.component';
import { EndingSessionComponent } from './services/redirecting/ending-session/ending-session.component';



@NgModule({
  declarations: [
    AppComponent,
    Pagina2Component,
    LoginComponent,
    RedirectComponent,
    Pag3Component,
    RedirectingComponent,
    EndingSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AutenticacaoService, AutenticacaoGuard, Providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
