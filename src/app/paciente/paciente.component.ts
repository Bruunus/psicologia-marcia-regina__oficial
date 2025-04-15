import { AlteracaoDisplayService } from './../services/compartilhamento-de-dados/paciente/alteracao-display-service/alteracao-display.service';

import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingDocumentosService } from '../services/loading/documentos/loading-documentos.service';
import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { PacienteCacheService } from '../services/cache/paciente/paciente-cache.service';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MascaraService } from '../services/utilits/forms/mascaras/mascara.service';
import { Location } from '@angular/common';

declare var $: any;

const ANIMATION_DURATION = '70ms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: [
    './paciente-style-global.component.scss',
    './paciente-extra-large.component.scss',
    './paciente-large.component.scss',
    './paciente-medium.component.scss',
    './paciente-small.component.scss',
    './paciente-smartphone.component.scss'
  ],
  animations: [

    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(`${ANIMATION_DURATION} ease-in`, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(`${ANIMATION_DURATION} ease-out`, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class PacienteComponent implements OnInit {
  perfil: string | undefined;
  perfilApresentacao: string | undefined | null = '';
  perfilOriginal: string | undefined | null = '';
  nomePaciente: string | undefined | null = '';
  nomePacienteCompleto: string = '';
  itemSelecionado: string | null = null;
  rotaAtual: string = '';
  usuario: string | null = '';
  calculaClasseCSS: boolean = false;
  calculoMedidaMobile: boolean = false;
  calculoParaAjusteMobileNickName: boolean = false;
  min_width_1601: boolean = false;
  min_width_1200__and__max_width_1600: boolean = false;
  min_width_1018__and__max_width_1199: boolean = false;
  max_width_1017: boolean = false;
  larguraDaTela: number = window.innerWidth;
  menuAbertoSmall = false;
  menuAbertoMiddle = false;
  perfilVar: string | undefined = localStorage.getItem('perfil')?.toLocaleLowerCase();





  public loadingDocumentosService: LoadingDocumentosService;

  /**
   * Definindo os itens do menu de acordo com cada perfi. Para serem carregados dentro de um *ngFor.
   */
  itensMenuPsicologia: Array<{ label: string; path: string }> = [
    { label: 'Identificação', path: 'identificacao' },
    { label: 'Acompanhamento', path: 'acompanhamento' },
    { label: 'Relatório', path: 'relatorio' },
    { label: 'Financeiro', path: 'financeiro' },
    { label: 'Agendar consulta', path: 'agendar-consulta'},
    { label: 'Migrar paciente', path: 'migrar-paciente'},
    { label: 'Encerrar', path: 'finalizar-tratamento' },
  ];

  itensMenuNeuropsicologia: Array<{ label: string, path: string }> = [
    { label: 'Identificação', path: 'identificacao' },
    { label: 'Acompanhamento', path: 'acompanhamento' },
    { label: 'Relatório', path: 'relatorio' },
    { label: 'Laudo', path: 'laudo'},
    { label: 'Financeiro', path: 'financeiro' },
    { label: 'Agendar consulta', path: 'agendar-consulta'},
    { label: 'Migrar paciente', path: 'migrar-paciente'},
    { label: 'Encerrar', path: 'finalizar-tratamento' },
  ];




  constructor(
    private route: ActivatedRoute, private router: Router, private loadingDocumentosServiceInject: LoadingDocumentosService,
    protected alteracaoDisplayService: AlteracaoDisplayService, private apiAutenticacaoService: ApiAutenticacaoService,
    private pacienteCacheService: PacienteCacheService, private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private mascaraService: MascaraService, private location: Location

    , protected calculadorDeTelaModoDev: CalculadorDeTelaModoDev

  ) {
      /**
       * Captura a url em tempo real, divide ela com separador '/' retorna o último valor da separação.
       * Usei esse trecho para poder identificar a rota 'ativa' no momento em que o componente é carregado.
       */
      this.rotaAtual = this.router.url.split('/').pop() || '';
      this.loadingDocumentosService = this.loadingDocumentosServiceInject;
      this.larguraDaTela = window.innerWidth; // inicializando calculo de tela
    }

  ngOnInit() {
    this.init();
  }


  private init(): void {

    const localStoragePerfil = localStorage.getItem('perfil');
    this.perfil = localStoragePerfil ? localStoragePerfil.toLowerCase() : '';
    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario();
    this.perfilOriginal = this.mascaraService.formatarTextoMaiusculo(localStoragePerfil);
    this.perfilApresentacao = this.perfilOriginal;
    this.nomePacienteCompleto = localStorage.getItem('nomePaciente') ?? '';

    this.calculadorDeTelaModoDev.atualizarTamanhoTela();
    this.checkScreenSize();
    this.ajustaNomePaciente();

  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
    this.abreviarNomeNeuropsicologia();
    this.ajustaNomePaciente();
  }


  /**
   * Armazena o valor de item.path para identificar qual item do menu foi selecionado.
   * A condicional if garante que a navegação só ocorra se o path do item não for 'none',
   * undefined, ou null. Isso é necessário porque alguns itens podem não ter uma rota associada.
   * @param item
   */
  selecionarItem(item: { label: string; path: string }): void {
    this.itemSelecionado = item.path;


    /**
     * Ainda enfrentando o erro do aparecimento do loading, mesmo após renderizar a pagina, se clicar
     * com ele na página já renderizada ele volta a aparecer o loading. O que está incorreto pois o loading
     * só deve aparecer quando a api necessitar de chamar getPaciente (API). Do contrário não !
     */

      // this.loadingDocumentosService.setBoolean(false);


      // this.booleanValue = !this.booleanValue; // Alterna o valor
      this.loadingDocumentosService.setBoolean(true); // Atualiza o serviço


      if (item.path) {
        this.router.navigate([`/paciente/${this.perfil}/documentos/${item.path}`]);
      }





  }



   /* Controles dos Modais */
   openModal(): void {
    $('#exampleModalCenter').modal('show'); // Abre o modal
  }

  closeModal(): void {
    document.getElementById('safeElement')?.focus();
    $('#exampleModalCenter').modal('hide'); // Fecha o modal
  }





  /**
   * Esta função no carregamento da página verifica o tamanho da tela e
   * informa a variável informando um valor de média para ser usada em
   * certa lógica.
   */
  private checkScreenSize() {
    // const width = window.innerWidth;
    this.larguraDaTela = window.innerWidth;

    this.calculaClasseCSS = this.larguraDaTela >= 768 && this.larguraDaTela <= 1199;
    this.calculoMedidaMobile = this.larguraDaTela > 0 && this.larguraDaTela <= 543;
    this.calculoParaAjusteMobileNickName = this.larguraDaTela <= 320;

    // /* Medidas Genéricas */
    // this.min_width_1601 = this.larguraDaTela >= 1601;
    // this.min_width_1200__and__max_width_1600 = this.larguraDaTela >= 1200 && this.larguraDaTela <= 1600;
    // this.min_width_1018__and__max_width_1199 = this.larguraDaTela >= 1018 && this.larguraDaTela <= 1199;
    // this.max_width_1017 = this.larguraDaTela <= 1017;
    // this.ajusteMenuVerticalEmSincronismo(this.larguraDaTela);
  }


  // Retorna a classe correta para o perfil do logo
  getAddClasseCSS(): string[] {
    if (this.calculaClasseCSS) {
      if (this.perfilApresentacao === 'Psicologia') {
        return ['width_personalizado_menu_Psicologia'];
      } else if (this.perfilApresentacao === 'Neuropsicologia') {
        return ['width_personalizado_menu_Neuropsicologia'];
      }
    }
    return [];
  }


  /**
   * Função para exibir/oculta o menu para telas menores de
   * tablets menores e smartphone
   */
  getClasseVisibilidadeMenuSmall(): string {
    const isDispositivoPequeno = window.innerWidth <= 767;
    return isDispositivoPequeno
      ? (this.menuAbertoSmall ? 'visible' : 'hidden')
      : ''; // Se não for dispositivo pequeno, não aplica nenhuma classe
  }

  getClasseVisibilidadeMenuMiddle(): string[] {
    const isDispositivoMedio = window.innerWidth >= 768 && window.innerWidth <= 1030;

    return isDispositivoMedio
      ? [this.menuAbertoMiddle ? 'visible' : 'hidden']
      : []; // Se não for dispositivo pequeno, não aplica nenhuma classe
  }





  /**
   * Método de serviço que adiciona classes personalizadas CSS à div invocada
   * via [ngClass]. Este método observa em tempo real a dimensão da tela atual e
   * adiciona classes com largura definida em sincronismo com a largura da div
   * superior onde fica posicionada a descrição do perfil atual da tela.
   *
   * As medidas de largura estão definidas no arquivo de variaveis globais do CSS
   * 'styles-variaveis-globais.scss'
   */
  ajusteMenuVerticalEmSincronismo(): string[] {

    switch (true) {
      case (this.larguraDaTela >= 1601):
          if(this.perfilApresentacao === 'Psicologia') {
            return ['largura_personalizada_min_width_1601_psicologia']
          } else {
            return ['largura_personalizada_min_width_1601_neuropsicologia']
          }
      case (this.larguraDaTela >= 1200 && this.larguraDaTela <= 1600):
          if(this.perfilApresentacao === 'Psicologia') {
            return ['largura_personalizada_min_width_1200__and__max_width_1600_psicologia']
          } else {
            return ['largura_personalizada_min_width_1200__and__max_width_1600_neuropsicologia']
          }
      case (this.larguraDaTela >= 1018 && this.larguraDaTela <= 1199):
          if(this.perfilApresentacao === 'Psicologia') {
            return ['largura_personalizada_min_width_1018__and__max_width_1199_psicologia']
          } else {
            return ['largura_personalizada_min_width_1018__and__max_width_1199_neuropsicologia']
          }
      // case (this.larguraDaTela >= 768 && this.larguraDaTela <= 1017):
      //     if(this.perfilApresentacao === 'Psicologia') {
      //       return ['largura_personalizada_min_width_768_max_width_1017_psicologia']
      //     } else {
      //       return ['largura_personalizada_min_width_768_max_width_1017_neuropsicologia']
      //     }
    }
    return []
  }






  /**
   * Este método é invocado dentro do [ngClass] no html para receber
   * todas as operações dinâmicas relacionadas a estilização CSS. Cada
   * método presenta uma manipulação direta no CSS ou na estrutura do HTML
   * deste documento.
   * @returns Todos os objetos que serão incluídos no ngClass do Angular
   */
  operacoesNgClassParaClasseMenuSuspensoDocumentos(): string[] {
    return [
      ...this.ajusteMenuVerticalEmSincronismo(),
      this.getClasseVisibilidadeMenuSmall()


    ]
  }


  onNotify() {
    console.log('O filho notificou que a variável é true!');
    // this.booleanValue = false;
    // Aqui você pode adicionar a lógica que deseja executar quando o filho notifica
    // console.log('Teste de renderizar tela')
  }


  // Atualiza o nome conforme a largura da tela
  protected ajustaNomePaciente(): string {
    const larguraTela = window.innerWidth;

    // Se a tela for menor que 375px, mostra a versão abreviada
    if (larguraTela < 524) {
      return this.nomePaciente = this.abreviarNome(this.nomePacienteCompleto);
    } else {
      // Em telas maiores, mostra o nome completo
      return this.nomePaciente = this.nomePacienteCompleto;
    }

  }


  /**
   * Este método Javascript resume o nome do paciente para telas mobile para adptar
   * a tela em caso do nome ser muito grande.
   *
   * @param nome abreviado
   * @returns
   */
  private abreviarNome(nome: string): string {
    if (!nome) return '';

    const partes = nome.split(' ');
    if (partes.length <= 2) {
      return nome; // Se houver até dois nomes, exibe completo.
    }

    let resultado = partes[0]; // Sempre inclui o primeiro nome
    let espacos = 0;

    for (let i = 1; i < partes.length; i++) {
      // Verifica a próxima palavra
      const proximaParte = partes[i];

      // Permite adicionar a palavra se:
      // 1. Ainda não atingiu dois espaços
      // 2. A próxima parte tem até 3 letras (ex: "de", "dos")
      if (espacos < 2) {
        resultado += ` ${proximaParte}`;
        espacos++;

        // Se a palavra tiver mais que 3 letras, interrompe a abreviação
        if (proximaParte.length > 3) {
          break;
        }
      }
    }

    return resultado;
  }

  private abreviarNomeNeuropsicologia(): void {

    const largura = window.innerWidth;

    console.log('Perfil detectado: ', this.perfilOriginal)

    if (largura <= 352 && this.perfilOriginal === 'Neuropsicologia') {
      this.perfilApresentacao = 'Neuro';
    } else {
      this.perfilApresentacao = this.perfilOriginal;
    }
    //  console.log('Largura:', window.innerWidth, '| Perfil exibido:', this.perfilApresentacao);
  }




  /**
   * Navega para a rota fornecida. O caminho é construído concatenando /paciente/documentos/ com o valor de path.
   * @param path valor da
   */
  navegarPara(path: string): void {
    this.router.navigate([`/paciente/${this.perfil}/documentos/${path}`]);
    this.rotaAtual = path;
  }




  /**
   * Este é um evento partido do evento principal de exibir ou ocultar o menu.
   * Ele entra em acão após o click no menu hamburguer com o menu exibição. O que
   * ele realiza é que caso o menu estiver sendo exibido e clicar em qualquer região
   * fora, ele faz o menu fechar
   */
  toggleMenuSmall(): void {
    this.menuAbertoSmall = !this.menuAbertoSmall;
  }
  fecharMenuSmall(): void {
    this.menuAbertoSmall = false;
  }

  toggleMenuMiddle(): void {
    this.menuAbertoMiddle = !this.menuAbertoMiddle;
  }
  fecharMenuMiddle(): void {
    this.menuAbertoMiddle = false;
  }



  /**
   * Eventos para os menus ocultos para controlar a ocultação quando clicar fora.'
   * @param event
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    const menuElementSmall = document.querySelector('.menu-suspenso-documentos');
    const buttonElementSmall = document.querySelector('[data-menu-button]');

    const menuElementMiddle = document.querySelector('.container-opcoes-menu-sair');
    const buttonElementMiddle = document.querySelector('[data-menu-middle-button]')

    if (menuElementSmall && !menuElementSmall.contains(target) && !buttonElementSmall?.contains(target)) {
      this.fecharMenuSmall();
    }

    if(menuElementMiddle && !menuElementMiddle.contains(target) && !buttonElementMiddle?.contains(target)) {
      this.fecharMenuMiddle();
    }
  }




  // protected redirectMenu(): void {
  //   setTimeout(() => {
  //     localStorage.removeItem('cpf');
  //     localStorage.removeItem('nomePaciente');
  //     localStorage.removeItem('perfil');
  //     this.pacienteCacheService.clearCachePaciente();

  //     this.router.navigate(['/home/pacientes']);
  //   }, 450);
  // }

  protected redirectMenu(): void {
    this.closeModal()
    setTimeout(() => {
      localStorage.removeItem('cpf');
      localStorage.removeItem('nomePaciente');
      localStorage.removeItem('perfil');
      this.pacienteCacheService.clearCachePaciente();

      this.router.navigate(['/home/pacientes'], {replaceUrl: true}); // o replace limpa o histórico e impede de voltar com a seta
    }, 450);

    this.ajustaNomePaciente();

  }





  protected encerrarSessao() {
    this.closeModal();

    setTimeout(() => {
      this.router.navigate(['ending-session']);
      this.apiAutenticacaoService.apiDeslogar(this.usuario!); /* Necessário para atualizar o banco em tempo de execução */
    }, 380);
  }

  /**
   * Evento de interação com Mouse
   */
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // previne scroll se for espaço
      this.openModal();
    }
  }

  /**
   * Executa chamando o template nos itens do menu ao navegar até a opção usando Tab
   */
  handleKeyDown(event: KeyboardEvent, item: { label: string; path: string }): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Evita rolagem com Espaço
      this.selecionarItem(item);
      this.fecharMenuSmall();
    }
  }

  verificandoSaida = false;

//   @HostListener('window:popstate', ['$event'])
// onPopState(event: PopStateEvent): void {
//   const confirmLeave = confirm('Você está saindo do perfil do paciente. Deseja continuar?');

//   if (confirmLeave) {
//     this.redirectMenu(); // Redireciona para "Home", por exemplo
//   } else {
//     // Volta imediatamente para a tela atual (cancelando o "voltar")
//     this.location.forward(); // Força voltar para frente no histórico
//   }
// }




}
