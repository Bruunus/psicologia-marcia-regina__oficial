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

import { RedirectingComponent } from './services/redirecting/redirecting.component';
import { EndingSessionComponent } from './services/redirecting/ending-session/ending-session.component';
import { MessageComponent } from './services/messagers/message/message.component';
import { ErrorsProvider } from './providers/errors-provider';
import { AngularProvider } from './providers/angular-provider';
import { ModelProvider } from './providers/model-provider';
import { ApiServicesProvider } from './providers/api-services-provider';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuPrincipalComponent } from './templates/menu-principal/menu-principal.component';
import { DisplayInfoMessageComponent } from './services/messagers/info-message/display-info-message-generics/display-info-message/display-info-message.component';
import { LoadingComponent } from './services/waiting/loading/loading.component';
import { ServicesProvider } from './providers/services-provider';
import { CadastroPacienteInfoMessageComponent } from './services/messagers/info-message/cadastro-paciente/display-cadastro-paciente/cadastro-paciente-info-message.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    AppComponent,
    PacientesHomeComponent,
    LoginComponent,
    RedirectComponent,
    RedirectingComponent,
    EndingSessionComponent,
    MessageComponent,
    CadastroComponent,
    MenuPrincipalComponent,
    DisplayInfoMessageComponent,
    LoadingComponent,
    CadastroPacienteInfoMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    AngularProvider,
    AutenticacaoGuard,
    AuthenticationProvider,
    ErrorsProvider,
    ModelProvider,
    ApiServicesProvider,
    ServicesProvider,
    provideEnvironmentNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
