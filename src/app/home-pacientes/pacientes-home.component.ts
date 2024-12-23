import { Component, OnInit } from '@angular/core';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { TimeoutService } from '../services/sessao/timeout.service';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PacienteSeach } from '../model/home/paciente-seach';
import { MessageComponent } from '../services/messagers/message/message.component';
import { MessageService } from '../services/messagers/message/message.service';
import { HomeService } from '../services/api/read/home/home.service';
import { TelaHome } from '../model/home/tela-home';


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
  public listaPacienteHome: TelaHome[] = [];
  public loading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router, private timeoutService: TimeoutService,
    private apiAutenticacaoService: ApiAutenticacaoService,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private errorComponent: MessageComponent,
    private errorService: MessageService,
    private apiHomeService: HomeService,
    protected calculadorDeTelaModoDev: CalculadorDeTelaModoDev

  ) {
    this.paciente = new PacienteSeach();
    this.pesquisaDePaciente = new FormGroup({
      pesquisa: new FormControl(this.paciente.parametro, [Validators.required, Validators.maxLength(15)])
    });
   }

  ngOnInit(): void {
    this.calculadorDeTelaModoDev.atualizarTamanhoTela();
    this.timeoutService.initSessionTimeout();
    this.nomeLogin = this.gerenciadoDeAutenticacaoService.getUsuario();
    this.carregarTabela();





  }


  logout() {
    this.router.navigate(['ending-session']);
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!); /* Necessário para atualizar o banco em tempo de execução */
  }

  onCloseMessage(): void {
    this.errorService.closeMessage();
  }

  getNomeUsuarioLogado(): string {
    return this.nomeLogin!;
  }



  protected carregarTabela(): void {
    this.apiHomeService.carregarListaHomePacientes().then(
      (data) => {
        console.log(data)
        this.listaPacienteHome = data;

        this.listaPacienteHome.forEach(item => {
          if(item.dataUltimoAtendimento === null) {
            //append button


            // Cria o botão
            const button = document.createElement('button');
            button.innerText = 'Ação'; // Texto do botão
            button.className = 'btn-acoes'; // Adiciona uma classe, se necessário

            // Adiciona um evento de clique ao botão
            button.onclick = () => {
              this.suaFuncao(item); // Chama sua função passando o item
            };

            // Encontre o elemento onde você deseja adicionar o botão
            const spanElement = document.querySelector(`.perfil-item[data-id="${item.pacienteId}"]`);
            if (spanElement) {
              spanElement.appendChild(button); // Adiciona o botão ao span
            }


          }

        })


      }
    )
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



  ngOnDestroy() {
    // Emite um valor para cancelar todas as assinaturas
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
