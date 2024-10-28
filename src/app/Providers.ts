import { TimeoutService } from './services/sessao/timeout.service';
import { Usuario } from './login/usuario';
import { ApiAutenticacaoService } from './services/autenticacao/api-autenticacao.service';
import { NgModule } from "@angular/core";
import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';
import { PesquisaPaciente } from './model/pesquisa-paciente';
import { ErrorComponent } from './services/error/error.component';

@NgModule({
  providers: [
    ApiAutenticacaoService, Usuario, TimeoutService, PesquisaPaciente, ErrorComponent, CalculadorDeTelaModoDev
  ]
})
export class Providers {}
