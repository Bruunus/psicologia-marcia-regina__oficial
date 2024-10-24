import { TimeoutService } from './services/sessao/timeout.service';
import { Usuario } from './login/usuario';
import { ApiAutenticacaoService } from './services/autenticacao/api-autenticacao.service';
import { NgModule } from "@angular/core";
import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';

@NgModule({
  providers: [
    ApiAutenticacaoService, Usuario, TimeoutService, CalculadorDeTelaModoDev
  ]
})
export class Providers {}
