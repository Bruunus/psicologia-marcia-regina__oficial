import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GerenciadoDeAutenticacaoService } from 'src/app/services/sessao/gerenciador-de-autenticacao.service';

@Component({
  selector: 'app-middle-tablets',
  templateUrl: './middle-tablets.component.html',
  styleUrls: ['./middle-tablets.component.scss']
})
export class MiddleTabletsComponent implements OnInit {

  usuario: string | null = '';
  menuAbertoMiddle = false;
  perfilVar: string | undefined = localStorage.getItem('perfil')?.toLocaleLowerCase();

  @Input() perfilApresentacao: string | undefined | null = '';
  @Input() nomePaciente: string | undefined | null = '';
  @Output() redirectMenu = new EventEmitter<void>();
  @Output() encerrarSessao = new EventEmitter<void>();

  constructor(private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService) {}


  ngOnInit() {
    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario();
  }

  redirectMenuInPaciente() {
    this.redirectMenu.emit();
  }

  encerrarSessaoInPaciente() {
    this.encerrarSessao.emit();
  }


  toggleMenuMiddle(): void {
    this.menuAbertoMiddle = !this.menuAbertoMiddle;
  }
  fecharMenuMiddle(): void {
    this.menuAbertoMiddle = false;
  }


  @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {

      const target = event.target as HTMLElement;

      const menuElementMiddle = document.querySelector('.container-opcoes-menu-sair');
      const buttonElementMiddle = document.querySelector('[data-menu-middle-button]')



      if(menuElementMiddle && !menuElementMiddle.contains(target) && !buttonElementMiddle?.contains(target)) {
        this.fecharMenuMiddle();
      }
    }

  getClasseVisibilidadeMenuMiddle(): string[] {
    const isDispositivoMedio = window.innerWidth >= 768 && window.innerWidth <= 1030;

    return isDispositivoMedio
      ? [this.menuAbertoMiddle ? 'visible' : 'hidden']
      : []; // Se não for dispositivo pequeno, não aplica nenhuma classe
  }

  ajusteLarguraMenuOculto(): string[] {
    if(this.perfilApresentacao === 'Psicologia') {
      return ['container-opcoes-menu-sair__psicologia']
    } else {
      return ['container-opcoes-menu-sair__neuropsicologia']
    }
  }

  ngClassFactory(): string[] {
    return [
      ...this.getClasseVisibilidadeMenuMiddle(),
      ...this.ajusteLarguraMenuOculto()
    ]

  }



}
