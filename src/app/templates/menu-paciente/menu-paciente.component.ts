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
    './menu-paciente-small.component.scss',
    './menu-paciente-smartphone.component.scss'
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
  isMenuVisible: boolean = false;

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
  }


  protected toggleMenuResponsiveMiddle() {
    this.isMenuVisible = !this.isMenuVisible; // Alterna a visibilidade
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
