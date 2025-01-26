
import { Component, OnInit } from '@angular/core';
import { PacienteCompartilhamentoService } from '../services/compartilhamento-de-dados/paciente/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente-style-global.component.scss']
})

export class PacienteComponent implements OnInit {
  paciente: string | undefined;
  perfil: string | undefined;
  itemSelecionado: string | null = null;
  rotaAtual: string = '';

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
    { label: 'Finalizar tratamento', path: 'finalizar-tratamento' },
  ];

  itensMenuNeuropsicologia: Array<{ label: string, path: string }> = [
    { label: 'Identificação', path: 'identificacao' },
    { label: 'Acompanhamento', path: 'acompanhamento' },
    { label: 'Relatório', path: 'relatorio' },
    { label: 'Laudo', path: 'laudo'},
    { label: 'Financeiro', path: 'financeiro' },
    { label: 'Agendar consulta', path: 'agendar-consulta'},
    { label: 'Migrar paciente', path: 'migrar-paciente'},
    { label: 'Finalizar tratamento', path: 'finalizar-tratamento' },
  ];




  constructor(
    private pacienteCompartilhamentoService: PacienteCompartilhamentoService, private route: ActivatedRoute,
    private router: Router ) {
      /**
       * Captura a url em tempo real, divide ela com separador '/' retorna o último valor da separação.
       * Usei esse trecho para poder identificar a rota 'ativa' no momento em que o componente é carregado.
       */
      this.rotaAtual = this.router.url.split('/').pop() || '';
    }

  ngOnInit() {
    this.paciente = this.pacienteCompartilhamentoService.getPacienteCpf();
    const localStoragePerfil = localStorage.getItem('perfil');
    console.log('Storage de perfil: ', localStoragePerfil);
    this.perfil = localStoragePerfil ? localStoragePerfil.toLowerCase() : '';

  }


  /**
   * Armazena o valor de item.path para identificar qual item do menu foi selecionado.
   * A condicional if garante que a navegação só ocorra se o path do item não for 'none',
   * undefined, ou null. Isso é necessário porque alguns itens podem não ter uma rota associada.
   * @param item
   */
  selecionarItem(item: { label: string; path: string }): void {
    this.itemSelecionado = item.path;
    if (item.path !== 'none' || item.path !== undefined || item.path !== null) {
      this.router.navigate([`/paciente/${this.perfil}/documentos/${item.path}`]);
    }
  }


  /**
   * Navega para a rota fornecida. O caminho é construído concatenando /paciente/documentos/ com o valor de path.
   * @param path valor da
   */
  navegarPara(path: string): void {
    this.router.navigate([`/paciente/${this.perfil}/documentos/${path}`]);
    this.rotaAtual = path;
  }









}
