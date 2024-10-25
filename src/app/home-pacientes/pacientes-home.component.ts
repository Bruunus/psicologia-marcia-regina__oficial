import { Component, Injectable, OnInit } from '@angular/core';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { TimeoutService } from '../services/sessao/timeout.service';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pacientes-home',
  templateUrl: './pacientes-home.component.html',
  styleUrls: [
    './style-default.scss',
    './pacientes-home-big.component.scss',
    'pacientes-home-middle.component.scss',
    'pacientes-home-small.component.scss']
})
export class PacientesHomeComponent implements OnInit {

  nomeLogin: string | null = '';
  subscription: Subscription = Subscription.EMPTY;


  constructor(private router: Router, private timeoutService: TimeoutService,
    private apiAutenticacaoService: ApiAutenticacaoService,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService

  ) {

   }

  ngOnInit(): void {
    // console.log('Inicio do timeout')
    // console.log('Token de sessão: ', localStorage.getItem('token'))
    this.timeoutService.initSessionTimeout();
    this.nomeLogin = this.gerenciadoDeAutenticacaoService.getUsuario();

    console.log('Usuario do gerenciador', this.nomeLogin)



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


  // ngOnDestroy(): void {

  //   if (this.subscription) {
  //     this.subscription.unsubscribe();

  //   }
  // }

}
