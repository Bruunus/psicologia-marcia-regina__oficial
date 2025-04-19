import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AlteracaoDisplayService } from 'src/app/services/compartilhamento-de-dados/paciente/alteracao-display-service/alteracao-display.service';
import { GerenciadoDeAutenticacaoService } from 'src/app/services/sessao/gerenciador-de-autenticacao.service';

@Component({
  selector: 'app-small-smartphones',
  templateUrl: './small-smartphones.component.html',
  styleUrls: ['./small-smartphones.component.scss']
})
export class SmallSmartphonesComponent implements OnInit {

  menuAbertoSmall = false;
  perfilVar: string | undefined = localStorage.getItem('perfil')?.toLocaleLowerCase();
  usuario: string | null = '';

  @Input() perfilApresentacao: string | undefined | null = '';
  @Input() nomePaciente: string | undefined | null = '';
  @Output() redirectMenu = new EventEmitter<void>();
  @Output() encerrarSessao = new EventEmitter<void>();


  constructor(private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private alteracaoDisplayService: AlteracaoDisplayService
  ) {}

  ngOnInit() {
    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario();
  }



  /**
   * Este é um evento partido do evento principal de exibir ou ocultar o menu.
   * Ele entra em acão após o click no menu hamburguer com o menu exibição. O que
   * ele realiza é que caso o menu estiver sendo exibido e clicar em qualquer região
   * fora, ele faz o menu fechar
   */
  toggleMenuSmall(): void {
    // this.menuAbertoSmall = !this.menuAbertoSmall;
    this.alteracaoDisplayService.toggleMenu()
  }
  fecharMenuSmall(): void {
    this.menuAbertoSmall = false;
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

    if (menuElementSmall && !menuElementSmall.contains(target) && !buttonElementSmall?.contains(target)) {
      this.fecharMenuSmall();
    }

  }



}
