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
        }).catch((error) => {
          if(error.status === 401) {
            var messageServer = error.error;
            this.errorService.setErrorMessageLogin(messageServer);
            // console.log(messageServer)
          } else {
            console.log('Erro desconhecido:', error);
          }
        })
  }


  statusLogin(usuario: Usuario): Promise<boolean> {
    return this.apiAutenticacaoService.statusUsuario(usuario)
      .then(() => {
        return true; // Resolva a Promise com true se a verificação de status for bem-sucedida
      })
      .catch((error) => {
        if (error.status === 401) {
          var messageServer = error.error;
          this.errorService.setErrorMessageLogin(messageServer);
          return false; // Rejeite a Promise com false se o status for 401
        } else {
          return true; // Rejeite a Promise com true para outros erros
        }
      });
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
