import { GerenciadoDeAutenticacaoService } from './services/sessao/gerenciador-de-autenticacao.service';
import { TimeoutService } from './services/sessao/timeout.service';
import { Usuario } from './login/usuario';
import { ApiAutenticacaoService } from './services/autenticacao/api-autenticacao.service';
import { NgModule } from "@angular/core";
import { EndingSessionComponent } from './services/redirecting/ending-session/ending-session.component';
import { PacientesHomeComponent } from './home-pacientes/pacientes-home.component';
import { CachePbservable } from './login/cache-observable.service';

@NgModule({
  providers: [
    ApiAutenticacaoService, Usuario, TimeoutService, CachePbservable
  ]
})
export class Providers {}
