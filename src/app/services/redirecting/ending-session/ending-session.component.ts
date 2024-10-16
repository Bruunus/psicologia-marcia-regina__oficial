import { GerenciadoDeAutenticacaoService } from './../../sessao/gerenciador-de-autenticacao.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PacientesHomeComponent } from 'src/app/home-pacientes/pacientes-home.component';
import { ApiAutenticacaoService } from '../../autenticacao/api-autenticacao.service';

@Component({
  selector: 'app-ending-session',
  templateUrl: './ending-session.component.html',
  styleUrls: ['./ending-session.component.scss']
})
export class EndingSessionComponent implements OnInit {

  nomeLogin: string = '';

  constructor(private router: Router, private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService, private apiAutenticacaoService: ApiAutenticacaoService) { }

  ngOnInit(): void {
    this.nomeLogin = this.gerenciadoDeAutenticacaoService.getUsuario();
    setTimeout(() => {
      this.logoff();
    }, 995);  // tempo de timeout necessário para carregamento da pag para informar o usuário da sessão encerrada.
  }

  logoff() {
    // console.log('Finalizando sessão'); //{Debug}\\
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin).then(() => {
      localStorage.removeItem('token');/*Nunca remover*/
    }
  );
    this.router.navigate(['login']);
    window.location.reload();
  }



}
