import { TimeoutService } from './timeout.service';
import { ApiAutenticacaoService } from './../services/autenticacao/api-autenticacao.service';
import { Router } from '@angular/router';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private autenticado: boolean = false;
  private errorMessageAPI: string = ';'
  subscription: Subscription = new Subscription();

  constructor( private router: Router, private apiAutenticacaoService: ApiAutenticacaoService

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
          if(error.status === 401) {
            console.log(error.error)
          } else {
            console.log('Erro desconhecido:', error);
          }
        })
  }






  deslogar(usuario: string) {
    console.log('entrando em deslogar...')

    this.apiAutenticacaoService.apiDeslogar(usuario).then(() => {
      localStorage.removeItem('token');
      this.autenticado = false;
      this.router.navigate(['ending-session']);
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
