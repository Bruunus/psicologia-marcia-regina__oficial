import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from 'src/app/services/autenticacao/api-autenticacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
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
  ]
})
export class MenuPacienteComponent implements OnInit, OnDestroy {

  perfil: string | undefined | null = '';
  nomePaciente: string | undefined | null = '';
  usuario: string | null = '';
  perfilVar: string | undefined = localStorage.getItem('perfil')?.toLocaleLowerCase();
  isMenuVisible: boolean = false;

  // private modal: any;

  constructor(private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService, private router: Router,
    private apiAutenticacaoService: ApiAutenticacaoService, private pacienteCacheService: PacienteCacheService,
    private mascaraService: MascaraService


  ) {

  }

  ngOnInit(): void {



    const perfilStorage = localStorage.getItem('perfil');
    this.perfil = this.mascaraService.formatarTextoMaiusculo(perfilStorage);
    this.nomePaciente = localStorage.getItem('nomePaciente');

    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario();

    // Adiciona o listener de evento ao clicar fora do menu
    document.addEventListener('click', this.handleClickOutside.bind(this));

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

  }

  protected toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible; // Alterna a visibilidade do menu
  }

  protected handleClickOutside(event: MouseEvent) {
    const menuElement = document.querySelector('.para-responsivo-do-item-sair'); // ID do seu menu
    const toggleButton = document.querySelector('.icone-sair'); // ID do botão que ativa o menu

    // Verifica se o clique foi fora do menu e do botão
    if (this.isMenuVisible && menuElement && toggleButton) {
        if (!menuElement.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
          this.isMenuVisible = false; // Fecha o menu
        }
    }
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
    document.removeEventListener('click', this.handleClickOutside.bind(this));
}



}
