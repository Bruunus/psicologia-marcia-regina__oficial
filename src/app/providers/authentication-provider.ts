import { TimeoutService } from '../services/sessao/timeout.service';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { NgModule } from "@angular/core";
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { AutenticacaoGuard } from '../services/autenticacao/autenticacao.guard';
import { Usuario } from '../model/login/usuario';

@NgModule({
  providers: [
    GerenciadoDeAutenticacaoService,
    ApiAutenticacaoService,
    Usuario,
    TimeoutService
  ]
})
export class AuthenticationProvider {}
