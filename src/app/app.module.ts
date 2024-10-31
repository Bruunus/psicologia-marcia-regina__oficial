import { AuthenticationProvider } from './providers/authentication-provider';
import { AutenticacaoGuard } from './services/autenticacao/autenticacao.guard';
import { GerenciadoDeAutenticacaoService } from './services/sessao/gerenciador-de-autenticacao.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PacientesHomeComponent } from './home-pacientes/pacientes-home.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from './services/redirecting/redirect/redirect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Pag3Component } from './pag3/pag3.component';
import { RedirectingComponent } from './services/redirecting/redirecting.component';
import { EndingSessionComponent } from './services/redirecting/ending-session/ending-session.component';
import { ErrorComponent } from './services/error/error.component';
import { ErrorsProvider } from './providers/errors-provider';
import { AngularProvider } from './providers/angular-provider';
import { ModelProvider } from './providers/model-provider';
import { ApiServicesProvider } from './providers/api-services-provider';



@NgModule({
  declarations: [
    AppComponent,
    PacientesHomeComponent,
    LoginComponent,
    RedirectComponent,
    Pag3Component,
    RedirectingComponent,
    EndingSessionComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AngularProvider,AutenticacaoGuard, AuthenticationProvider, ErrorsProvider, ModelProvider, ApiServicesProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
