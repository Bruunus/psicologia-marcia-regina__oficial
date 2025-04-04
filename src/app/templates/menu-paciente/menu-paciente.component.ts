import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from 'src/app/services/autenticacao/api-autenticacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { AlteracaoDisplayService } from 'src/app/services/compartilhamento-de-dados/paciente/alteracao-display-service/alteracao-display.service';
import { GerenciadoDeAutenticacaoService } from 'src/app/services/sessao/gerenciador-de-autenticacao.service';
import { MascaraService } from 'src/app/services/utilits/forms/mascaras/mascara.service';

declare var $: any;


@Component({
  selector: 'app-menu-paciente',
  templateUrl: './menu-paciente.component.html',
  styleUrls: [
    './menu-paciente-style-global.component.scss',
    './menu-paciente-extra-large.component.scss',
    './menu-paciente-large.component.scss',
    './menu-paciente-medium.component.scss',
    './menu-paciente-small.component.scss'
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, height: '0px', overflow: 'hidden' })),
      state('*', style({ opacity: 1, height: '*' })),
      transition('void => *', [animate('0.5s ease-in')]),
      transition('* => void', [animate('0.5s ease-out')]),
    ]),
  ]

})
export class MenuPacienteComponent implements OnInit, OnDestroy {

  perfil: string | undefined | null = '';
  nomePaciente: string | undefined | null = '';
  nomePacienteCompleto: string = '';
  usuario: string | null = '';
  perfilVar: string | undefined = localStorage.getItem('perfil')?.toLocaleLowerCase();
  isMenuVisibleResponsivaMiddle: boolean = false;
  isMenuVisibleResponsivaMiddle__767_420: boolean = false;
  calculoParaTelasMedium: boolean = false;
  colLg9!:  boolean;
  colMd9!:  boolean;
  col12!:   boolean;
  colSm12!: boolean;

  // private modal: any;

  constructor(private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService, private router: Router,
    private apiAutenticacaoService: ApiAutenticacaoService, private pacienteCacheService: PacienteCacheService,
    private mascaraService: MascaraService, private alteracaoDisplayService: AlteracaoDisplayService


  ) {

  }

  ngOnInit(): void {

    const perfilStorage = localStorage.getItem('perfil');
    this.perfil = this.mascaraService.formatarTextoMaiusculo(perfilStorage);
    // Garante que nomePacienteCompleto armazena o nome original
    this.nomePacienteCompleto = localStorage.getItem('nomePaciente') ?? '';

    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario();

    this.atualizarNomePaciente();
    this.checkScreenSize();

  }





  /* Controles do Modal */
  openModal(): void {
    $('#exampleModalCenter').modal('show'); // Abre o modal
  }

  closeModal(): void {
    document.getElementById('safeElement')?.focus();
    $('#exampleModalCenter').modal('hide'); // Fecha o modal
  }

  protected redirectMenu(): void {
    this.closeModal()
    setTimeout(() => {
      localStorage.removeItem('cpf');
      localStorage.removeItem('nomePaciente');
      localStorage.removeItem('perfil');
      this.pacienteCacheService.clearCachePaciente();

      this.router.navigate(['/home/pacientes']);
    }, 450);

    this.atualizarNomePaciente();

  }

  // Detecta mudanças no tamanho da janela
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.atualizarNomePaciente();
    this.checkScreenSize();
  }

  // Verifica se está dentro da faixa de 768px a 1017px
  private checkScreenSize() {
    const width = window.innerWidth;
    this.calculoParaTelasMedium = width >= 431 && width <= 1017;
    this.configuracaoDinamicaDeClassesBoostrap();
  }



  // Retorna a classe correta para o perfil do logo
  getLogoPerfilClasse(): any {
    if (this.calculoParaTelasMedium) {
      return {
        'col-md-3': this.perfil === 'Psicologia',
        'col-md-4': this.perfil === 'Neuropsicologia'
      };
    }
    return {};
  }

  // Retorna a classe correta para o nome do paciente
  getNomePacienteClasse(): any {
    if (this.calculoParaTelasMedium) {
      return {
        'col-md-9': this.perfil === 'Psicologia',
        'col-md-8': this.perfil === 'Neuropsicologia'
      };
    }
    return {};
  }

  /**
   * Este método realiza o cálculo em tempo real das propriedades de media
   * querie para adicioanar as classes bootstrap de acordo com o tamanho
   * de tela calculado em tempo real
   */
  configuracaoDinamicaDeClassesBoostrap(): { [key: string]: boolean } {
    const width = window.innerWidth;

    return {
      'col-xl-9': width >= 1200,
      'col-lg-9': width >= 992 && width <= 1199,
      'col-md-9': width >= 430 && width <= 991,
      'col-sm-12': width < 429
    };
  }

  /**
   * Este método é invocado dentro do [ngClass] no html para receber
   * todas as operações dinâmicas relacionadas a estilização CSS. Cada
   * método presenta uma manipulação direta no CSS ou na estrutura do HTML
   * deste documento.
   * @returns Todos os objetos que serão incluídos no ngClass do Angular
   */
  operacoesNgClass(): { [key: string]: boolean } {
    return {
      ...this.getNomePacienteClasse(),
      ...this.configuracaoDinamicaDeClassesBoostrap()
    }
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.menu-responsive-middle');
    /* classe da imagem do menu responsivo */
    const imgButton = document.querySelector('.img-responsive-middle');

    // Se o clique foi fora do menu e do botão, fecha o menu
    if (menuElement && !menuElement.contains(target) && !imgButton?.contains(target)) {
      this.isMenuVisibleResponsivaMiddle = false;
    }
  }


  protected toggleMenuResponsiveMiddle() {
    this.isMenuVisibleResponsivaMiddle = !this.isMenuVisibleResponsivaMiddle; // Alterna a visibilidade
  }


  /**
   * Tenho um desafio, voce consegue ler por aqui ? Se sim estou em um projeto
   * angular na qual este metodo toggleMenu está um (click) evento, que ao clicar
   * aparece o menu
   */
  protected toggleMenu() {

    this.alteracaoDisplayService.toggleMenu();
  }

  // Atualiza o nome conforme a largura da tela
  protected atualizarNomePaciente(): void {
    const larguraTela = window.innerWidth;

    // Se a tela for menor que 375px, mostra a versão abreviada
    if (larguraTela < 375) {
      this.nomePaciente = this.abreviarNome(this.nomePacienteCompleto);
    } else {
      // Em telas maiores, mostra o nome completo
      this.nomePaciente = this.nomePacienteCompleto;
    }
  }

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



  /* Evento do Modal */
  protected encerrarSessao() {
    this.closeModal();

    setTimeout(() => {
      this.router.navigate(['ending-session']);
      this.apiAutenticacaoService.apiDeslogar(this.usuario!); /* Necessário para atualizar o banco em tempo de execução */
    }, 430);
  }



  ngOnDestroy() {
    // Remove o listener de evento ao destruir o componente
    // document.removeEventListener('click', this.handleClickOutside.bind(this));
}



}
