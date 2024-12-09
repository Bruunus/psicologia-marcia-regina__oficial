import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from 'src/app/services/autenticacao/api-autenticacao.service';
import { GerenciadoDeAutenticacaoService } from 'src/app/services/sessao/gerenciador-de-autenticacao.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: [
    './menu-principal-style-global.component.scss',
    './menu-principal-extra-large.component.scss',
    './menu-principal-large.component.scss',
    './menu-principal-medium.component.scss',
    './menu-principal-small.component.scss',
    './menu-principal-smartphone.component.scss'
  ]
})
export class MenuPrincipalComponent implements OnInit {

  nomeLogin: string | null = '';

  constructor(
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService, private router: Router,
    private apiAutenticacaoService: ApiAutenticacaoService

  ) {

  }

  ngOnInit(): void {
    this.nomeLogin = this.gerenciadoDeAutenticacaoService.getUsuario();
  }



  logout() {
    this.router.navigate(['ending-session']);
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!); /* Necessário para atualizar o banco em tempo de execução */
  }

  getNomeUsuarioLogado(): string {
    return this.nomeLogin!;
  }

}
