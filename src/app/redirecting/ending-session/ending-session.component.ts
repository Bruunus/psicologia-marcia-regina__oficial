import { GerenciadoDeAutenticacaoService } from '../../services/sessao/gerenciador-de-autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../../services/autenticacao/api-autenticacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';

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
    private apiAutenticacaoService: ApiAutenticacaoService,
    private pacienteCacheService: PacienteCacheService
  )
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


    console.log('Lista de storages do sistema:')
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? ''; // Garante que key não seja null
      const value = localStorage.getItem(key) ?? ''; // Garante que value não seja null
      console.log(`${key}: ${value}`);
    }


    // 1. Remove os itens do localStorage
    // 2. Atualiza a página
    // 3. Após o reload, o Angular redirecionará para '/login' automaticamente
    setTimeout(() => {

      // localStorage.removeItem('token');
      // localStorage.removeItem('nomePaciente');
      // localStorage.removeItem('perfil');
      // localStorage.removeItem('usuario');
      // destino - destinoAposReload - 46862168199 - paciente -
      // localStorage.removeItem('paciente');

      // Deletando todos os itens do localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) ?? ''; // Garante que key não seja null
        localStorage.removeItem(key); // Remove o item com a chave obtida
      }

      this.pacienteCacheService.clearCachePaciente()


      window.location.reload();

    }, 700);



  }
}
