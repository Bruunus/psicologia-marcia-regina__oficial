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

  constructor(private router: Router, private apiAutenticacaoService: ApiAutenticacaoService) { }

  fazerLogin(usuario: Usuario) {
    //  É aqui que chama a API
    this.apiAutenticacaoService.apiAutenticacao(usuario).then(
      (result) => {
        if(result) {
          console.log('Usuário autenticado');
        } else {
          // Autenticação falhou
          console.log('Usuário incorreto');
        }
        }).catch((error) => {
          console.error('Erro ao processar autenticação:', error);
        })



    // if(usuario.login === 'bruno' && usuario.senha === '12345678') {
    //   this.autenticado = true;
    //   this.router.navigate(['/page2'])

    // } else {
    //   this.autenticado = false;

    // }





      }







  usuarioAutenticado() {
    return this.autenticado;
  }

  deslogar() {
    this.autenticado = false;
    interval(150).subscribe(() => {
      this.router.navigate(['/login'])
    });
    this.subscription.unsubscribe();

  }
}
