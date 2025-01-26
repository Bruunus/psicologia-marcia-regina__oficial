import { GerenciadoDeAutenticacaoService } from '../../services/sessao/gerenciador-de-autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../../services/autenticacao/api-autenticacao.service';

@Component({
  selector: 'app-ending-session',
  templateUrl: './ending-session.component.html',
  styleUrls: ['./ending-session.component.scss']
})
export class EndingSessionComponent implements OnInit {

  nomeLogin: string | null = ''  ;

  constructor(
    private router: Router,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private apiAutenticacaoService: ApiAutenticacaoService)
    { }

  ngOnInit(): void {
    this.nomeLogin = this.gerenciadoDeAutenticacaoService.getUsuario();
    setTimeout(() => {
      this.logoff();
    }, 100);  // tempo de timeout necessário para carregamento da pag para informar o usuário da sessão encerrada.
  }

  logoff() {
    // console.log('Finalizando sessão'); //{Debug}\\
    // console.log('Finalizando sessão'); // Para depuração
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!);


    // 1. Remove os itens do localStorage
    // 2. Atualiza a página
    // 3. Após o reload, o Angular redirecionará para '/login' automaticamente
    setTimeout(() => {

      localStorage.removeItem('token');
      localStorage.removeItem('nomePaciente');
      localStorage.removeItem('perfil');
      localStorage.removeItem('usuario');

      window.location.reload();

    }, 700);



  }
}
