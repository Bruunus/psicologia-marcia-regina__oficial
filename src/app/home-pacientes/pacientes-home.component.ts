import { ValidationFormService } from './../cadastro/utilits/validation/validation-form.service';
import { Component, OnInit } from '@angular/core';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { TimeoutService } from '../services/sessao/timeout.service';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PacienteSeach } from '../model/home/paciente-seach';
import { MessageService } from '../services/messagers/message/message.service';
import { HomeService } from '../services/api/read/home/home.service';
import { TelaHome } from '../model/home/tela-home';


@Component({
  selector: 'app-pacientes-home',
  templateUrl: './pacientes-home.component.html',
  styleUrls: [
    './pacientes-home-style-global.component.scss',
    './pacientes-home-extra-large.component.scss',
    './pacientes-home-large.component.scss',
    'pacientes-home-medium.component.scss',
    'pacientes-home-small.component.scss',
    './pacientes-home-smartphone.component.scss']
})
export class PacientesHomeComponent implements OnInit {

  protected nomeLogin: string | null = '';
  protected subscription: Subscription = Subscription.EMPTY;
  protected pesquisaDePaciente!: FormGroup;
  protected paciente: PacienteSeach;
  protected ordemAscendente: boolean = true;
  protected listaPacienteHome: TelaHome[] = [];
  protected listaPacienteHomeFiltrada: TelaHome[] = [];
  protected loading: boolean = true;
  protected exibirButtonLimpar: boolean = false; // Estado para verificar se a pesquisa foi realizada
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router, private timeoutService: TimeoutService,
    private apiAutenticacaoService: ApiAutenticacaoService,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private errorService: MessageService,
    private apiHomeService: HomeService,
    private validationFormService: ValidationFormService

  ) {
    this.paciente = new PacienteSeach();
    this.pesquisaDePaciente = new FormGroup({
      pesquisa: new FormControl(this.paciente.parametro, [Validators.required, Validators.maxLength(15)]),
      cancelar: new FormControl()
    });
   }

  ngOnInit(): void {
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


  /**
   * Para Doc: Traz os dados da api e atribui-lhes a lista listaPacienteHome e renderiza
   * no usuário final
   */
  protected carregarTabela(): void {
    this.apiHomeService.carregarListaHomePacientes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.listaPacienteHome = data;
          this.listaPacienteHomeFiltrada = this.listaPacienteHome;
        },
        error: (err) => {
          console.error('Erro ao carregar pacientes:', err);
        }
      })
  }


  /**
   * Evento de clique que captura o cpf do paciente, salva o estado em um objeto de service
   * e redireciona a página
   * @param paciente objeto correspondente ao cpf
   */
  protected redirectPaciente(paciente: TelaHome) {

    if(paciente.cpf === null || paciente.cpf === undefined) {
      console.error('não foi possível encontrar o paciente');
      return;
    } else {
      // localStorage.removeItem('cpf')
      localStorage.setItem('nomePaciente', paciente.nomeCompleto);
      const perfilFormatter = this.validationFormService.formatterPalavraPrimeiraLetraMaiuscula(paciente.perfil);
      localStorage.setItem('perfil', perfilFormatter);


      localStorage.setItem('cpf', paciente.cpf);

      const perfilFormatterMinusculoParaURl = perfilFormatter.toLowerCase();
      this.router.navigate([`/paciente/${perfilFormatterMinusculoParaURl}/documentos`]);
    }
  }



  /**
   * Método que realiza uma pesquisa na lista carregada do servidor, este método não busca o paciente
   * diretamente no banco, mas somente na lista carregada após a renderização. O seu objetivo é carregar
   * o objeto com base no nome do paciente apenas, qualquer outro valor retornará em erro a busca.
   * @returns a lista de pacientes com base no parrametro pesquisado
   */
  protected procurarPaciente(): void {
    const pesquisa = this.pesquisaDePaciente.get('pesquisa')?.value;
    const erroMessage = this.errorService.ERROR_SEACH_PATIENT;

    // Verifica se a pesquisa é nula, vazia ou um número
    if (pesquisa === null || pesquisa.trim() === '' || !isNaN(pesquisa)) {
      this.errorService.setMessage(erroMessage, 'ALERT_INFO');
      this.errorService.getMessage();
      this.exibirButtonLimpar = false;
      return;
    }

    const pesquisaLower = pesquisa.toLowerCase();

    // Filtra a lista de pacientes com base na pesquisa
    const listaFiltrada = this.listaPacienteHome.filter(paciente =>
      paciente.nomeCompleto.toLowerCase().includes(pesquisaLower) ||
      paciente.cpf.includes(pesquisa)
    );

    // Verifica se a lista filtrada está vazia
    if (listaFiltrada.length === 0) {
      this.errorService.setMessage(erroMessage, 'ALERT_INFO');
      this.errorService.getMessage();
      this.exibirButtonLimpar = false; // Mantém o botão invisível
      return;
    }

    // Se houver resultados, atualiza a lista filtrada
    this.listaPacienteHomeFiltrada = listaFiltrada;

    // Exibe o botão de limpar se houver resultados
    this.exibirButtonLimpar = this.listaPacienteHomeFiltrada.length > 0;
  }




  // Método para restaurar a lista original ao clicar no botão de pesquisa novamente
  resetarPesquisa(): void {
    this.pesquisaDePaciente.reset(); // Limpa o campo de pesquisa
    this.listaPacienteHomeFiltrada = this.listaPacienteHome; // Restaura a lista original
    this.exibirButtonLimpar = false; // Oculta o botãol
  }


  /**
   * Alternância de Ordem: A variável ordemAscendente é alternada a cada chamada da função, permitindo que a
   * tabela seja ordenada em ordem crescente ou decrescente. Método sort: O método sort é utilizado para
   * ordenar a lista de pacientes. Ele recebe uma função de comparação que determina a ordem dos elementos.
   * Obtenção de Valores: Os valores das colunas são obtidos usando a string coluna, que representa o nome
   * da coluna a ser ordenada. Tratamento de Datas: Se a coluna a ser ordenada for dataUltimoAtendimento,
   * os valores são convertidos para timestamps usando getTime(), o que facilita a comparação.
   * Tratamento de Nulos: Se um dos valores for nulo, ele é tratado como maior que qualquer data, garantindo
   * que os pacientes sem data de atendimento sejam posicionados corretamente na lista.
   * Comparação de Valores: A comparação é feita entre valorA e valorB, retornando -1, 1 ou 0 conforme
   * necessário para a ordenação.
   * @param coluna
   */
  protected ordenacao(coluna: string): void {
    this.ordemAscendente = !this.ordemAscendente; // Alterna a ordem entre crescente e decrescente.

    this.listaPacienteHome.sort((a, b) => {
      let valorA = a[coluna]; // Obtém o valor da coluna para o primeiro item.
      let valorB = b[coluna]; // Obtém o valor da coluna para o segundo item.

      // Se o campo for uma data, converte para timestamp para comparação.
      if (coluna === 'dataUltimoAtendimento') {
        valorA = new Date(valorA).getTime();
        valorB = new Date(valorB).getTime();
      }

      // Se o valor for nulo, trata como menor que qualquer data.
      if (valorA === null) return this.ordemAscendente ? 1 : -1;
      if (valorB === null) return this.ordemAscendente ? -1 : 1;

      // Compara os valores e retorna -1, 1 ou 0 para a ordenação.
      if (valorA < valorB) {
        return this.ordemAscendente ? -1 : 1;
      }
      if (valorA > valorB) {
        return this.ordemAscendente ? 1 : -1;
      }
      return 0; // Retorna 0 se os valores forem iguais.
    });
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
