import { TimeoutService } from './timeout.service';
import { ApiAutenticacaoService } from './../services/autenticacao/api-autenticacao.service';
import { Router } from '@angular/router';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { interval, Subscription } from 'rxjs';
import { ErrorService } from '../services/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private autenticado: boolean = false;
  private errorMessageAPI: string = ';'
  subscription: Subscription = new Subscription();

  constructor( private router: Router, private apiAutenticacaoService: ApiAutenticacaoService,
    private errorService: ErrorService

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

        })
  }







  deslogar(usuario: string) {
    console.log('entrando em deslogar...');
    this.router.navigate(['ending-session']);

    this.apiAutenticacaoService.apiDeslogar(usuario).then(() => {
      localStorage.removeItem('token');
      this.autenticado = false;

    }

  );

  }


  getUsuarioAutenticado() {
    return this.autenticado;
  }




  getToken() {
    return this.apiAutenticacaoService.getToken();
  }


  getErrorMessageAPI() {
    return this.errorMessageAPI;
  }

  setRrrorMessageAPI(message: string) {
    this.errorMessageAPI = message;
  }

}
