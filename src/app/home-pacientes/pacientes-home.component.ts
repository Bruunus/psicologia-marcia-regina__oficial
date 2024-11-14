import { Component, OnInit } from '@angular/core';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { TimeoutService } from '../services/sessao/timeout.service';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { Subscription } from 'rxjs';
import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PacienteSeach } from '../model/paciente-seach';
import { MessageComponent } from '../services/messagers/message/message.component';
import { MessageService } from '../services/messagers/message/message.service';


@Component({
  selector: 'app-pacientes-home',
  templateUrl: './pacientes-home.component.html',
  styleUrls: [
    './pacientes-home-default.component.scss',
    './pacientes-home-big.component.scss',
    'pacientes-home-middle.component.scss',
    'pacientes-home-small.component.scss']
})
export class PacientesHomeComponent implements OnInit {

  nomeLogin: string | null = '';
  subscription: Subscription = Subscription.EMPTY;
  pesquisaDePaciente!: FormGroup;
  paciente: PacienteSeach;


  constructor(
    private router: Router, private timeoutService: TimeoutService,
    private apiAutenticacaoService: ApiAutenticacaoService,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private errorComponent: MessageComponent,
    private errorService: MessageService,
    protected calculadorDeTelaModoDev: CalculadorDeTelaModoDev

  ) {
    this.paciente = new PacienteSeach();
   }

  ngOnInit(): void {
    this.calculadorDeTelaModoDev.atualizarTamanhoTela();
    // console.log('Inicio do timeout')
    // console.log('Token de sessão: ', localStorage.getItem('token'))
    this.timeoutService.initSessionTimeout();
    this.nomeLogin = this.gerenciadoDeAutenticacaoService.getUsuario();
    // console.log('Usuario do gerenciador', this.nomeLogin)

    this.pesquisaDePaciente = new FormGroup({
      pesquisa: new FormControl(this.paciente.parametro, [Validators.required, Validators.maxLength(15)])
    });

  }


  logout() {
    this.router.navigate(['ending-session']);
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!); /* Necessário para atualizar o banco em tempo de execução */
  }

  onCloseMessage(): void {
    this.errorService.closeMessage()
  }





  getNomeUsuarioLogado(): string {
    return this.nomeLogin!;
  }


  protected procurarPaciente(): void {

    if(this.pesquisa === null || this.pesquisa === '') {
      this.errorService.setMessage(this.errorService.ERROR_SEACH_PATIENT, 'ALERT_INFO');
      this.errorService.getMessage();
    } else {

      console.log(this.pesquisa)
    }

  }



  get pesquisa(): string {
    // o valro de pesquisa já é adicionar não dependendo de passar o value
    return this.pesquisaDePaciente.get('pesquisa')!.value;
  }



}
