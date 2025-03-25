import { AlteracaoDisplayService } from './../services/compartilhamento-de-dados/paciente/alteracao-display-service/alteracao-display.service';

import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingDocumentosService } from '../services/loading/documentos/loading-documentos.service';
import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { PacienteCacheService } from '../services/cache/paciente/paciente-cache.service';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';


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
  ]
})

export class PacienteComponent implements OnInit {
  perfil: string | undefined;
  itemSelecionado: string | null = null;
  rotaAtual: string = '';
  usuario: string | null = '';


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
    private pacienteCacheService: PacienteCacheService, private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService

    , protected calculadorDeTelaModoDev: CalculadorDeTelaModoDev

  ) {
      /**
       * Captura a url em tempo real, divide ela com separador '/' retorna o último valor da separação.
       * Usei esse trecho para poder identificar a rota 'ativa' no momento em que o componente é carregado.
       */
      this.rotaAtual = this.router.url.split('/').pop() || '';
      this.loadingDocumentosService = this.loadingDocumentosServiceInject;
    }

  ngOnInit() {
    this.calculadorDeTelaModoDev.atualizarTamanhoTela();
    const localStoragePerfil = localStorage.getItem('perfil');
    console.log('Storage de perfil: ', localStoragePerfil);
    this.perfil = localStoragePerfil ? localStoragePerfil.toLowerCase() : '';
    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario()





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





  onNotify() {
    console.log('O filho notificou que a variável é true!');
    // this.booleanValue = false;
    // Aqui você pode adicionar a lógica que deseja executar quando o filho notifica
    // console.log('Teste de renderizar tela')
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
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.menu-suspenso-documentos');
    /* classe da imagem do menu responsivo */
    const menuButton = document.querySelector('.link-img-menu');

    // Se o clique foi fora do menu e do botão, fecha o menu
    if (menuElement && !menuElement.contains(target) && !menuButton?.contains(target)) {
      this.alteracaoDisplayService.closeMenu();
    }
  }

  protected fecharMenu(): void {
    this.alteracaoDisplayService.closeMenu();
  }


  protected redirectMenu(): void {
    setTimeout(() => {
      localStorage.removeItem('cpf');
      localStorage.removeItem('nomePaciente');
      localStorage.removeItem('perfil');
      this.pacienteCacheService.clearCachePaciente();

      this.router.navigate(['/home/pacientes']);
    }, 450);
  }

  protected encerrarSessao() {
    setTimeout(() => {
      this.router.navigate(['ending-session']);
      this.apiAutenticacaoService.apiDeslogar(this.usuario!); /* Necessário para atualizar o banco em tempo de execução */
    }, 430);
  }




}
