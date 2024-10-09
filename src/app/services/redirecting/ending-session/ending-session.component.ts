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

  nomeLogin: string | null = '';

  constructor(private router: Router, private apiAutenticacaoService: ApiAutenticacaoService) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    console.log('Usuário LocalStorage: ', usuario)
    if(this.nomeLogin !== null) {
      this.nomeLogin = usuario;
    } else {
      console.error("Erro ao armazenar o nome de usuário em cache");
    }

    setTimeout(() => {
      this.logoff();
    }, 995);  // tempo de timeout necessário para carregamento da pag para informar o usuário da sessão encerrada.
  }

  logoff() {
    // console.log('Finalizando sessão'); //{Debug}\\
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!).then(() => {
      localStorage.removeItem('token');/*Nunca remover*/
    }
  );
    this.router.navigate(['login']);
    window.location.reload();
  }



}
