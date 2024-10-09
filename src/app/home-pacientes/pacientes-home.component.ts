import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AutenticacaoService } from '../login/autenticacao.service';
import { Usuario } from '../login/usuario';
import { TimeoutService } from '../login/timeout.service';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { CachePbservable } from '../login/cache-observable.service';


@Component({
  selector: 'app-pacientes-home',
  templateUrl: './pacientes-home.component.html',
  styleUrls: [
    './pacientes-home-big.component.scss',
    'pacientes-home-middle.component.scss',
    'pacientes-home-small.component.scss']
})
export class PacientesHomeComponent implements OnInit {

  nomeLogin: string | null = '';


  constructor(private router: Router, private timeoutService: TimeoutService,
    private apiAutenticacaoService: ApiAutenticacaoService,

  ) {

   }

  ngOnInit(): void {
    // console.log('Inicio do timeout')
    // console.log('Token de sessão: ', localStorage.getItem('token'))
    this.timeoutService.initSessionTimeout();
    this.nomeLogin = localStorage.getItem('usuario');
    // console.log('Teste com o  objeto usuário ', this.usuario.getLogin())
    // console.log('LocalStorage: ',this.nomeLogin)
  }


  logout() {
    this.router.navigate(['ending-session']);
    this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!); /* Necessário para atualizar o banco em tempo de execução */
  }


  // getFrutas() {
  //   this.http.get<any[]>('http://localhost:8080/api/list').subscribe(
  //     response => {
  //       this.frutas = response;
  //     },
  //     error => {

  //       console.error(error);
  //     }
  //   );
  // }




  getNomeUsuarioLogado(): string {
    return this.nomeLogin!;
  }

}
