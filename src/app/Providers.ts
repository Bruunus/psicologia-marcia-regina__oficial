import { TimeoutService } from './services/sessao/timeout.service';
import { Usuario } from './login/usuario';
import { ApiAutenticacaoService } from './services/autenticacao/api-autenticacao.service';
import { NgModule } from "@angular/core";

@NgModule({
  providers: [
    ApiAutenticacaoService, Usuario, TimeoutService
  ]
})
export class Providers {}
