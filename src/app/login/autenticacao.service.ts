import { TimeoutService } from './timeout.service';
import { ApiAutenticacaoService } from './../services/autenticacao/api-autenticacao.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private autenticado: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private apiAutenticacaoService: ApiAutenticacaoService

  ) { }

  fazerLogin(usuario: Usuario) {
    //  É aqui que chama a API
    this.apiAutenticacaoService.apiAutenticacao(usuario).then(
      (result) => {
        if(result) {

          this.autenticado = true;
          console.log('Usuário autenticado', this.getUsuarioAutenticado());




        } else {
          // Autenticação falhou
          console.log('Usuário incorreto');
          this.autenticado = false;
        }
        }).catch((error) => {
          console.error('Erro ao processar autenticação:', error);
        })
  }

  deslogar() {
    console.log('entrando em deslogar...')

    localStorage.removeItem('token');
    this.autenticado = false;

    this.router.navigate(['ending-session']);






  }


  getUsuarioAutenticado() {
    return this.autenticado;
  }




  getToken() {
    return this.apiAutenticacaoService.getToken();
  }


}
