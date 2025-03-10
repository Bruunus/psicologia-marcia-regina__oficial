import { GerenciadoDeAutenticacaoService } from '../sessao/gerenciador-de-autenticacao.service';
import { LoginComponent } from '../../login/login.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AutenticacaoGuard  {

  status: boolean = false;
  subscription: Subscription = new Subscription();

  constructor (private gerenciadorAutenticacaoService: GerenciadoDeAutenticacaoService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // console.log('status do usuarioAutenticado() dentro do canActivate, ', this.autenticacaoService.getUsuarioAutenticado())
      // console.log('Verificando autenticação...');
      // console.log('Usuário:', this.gerenciadorAutenticacaoService.getUsuario());
      // console.log('Token:', this.gerenciadorAutenticacaoService.getToken());
      // console.log('Usuário autenticado:', this.gerenciadorAutenticacaoService.getUsuarioAutenticado());

      //fazendo novo teste (Por enquanto funcionando)
      this.gerenciadorAutenticacaoService.getUsuarioAutenticado();

        if (
          !this.gerenciadorAutenticacaoService.getUsuario() ||
          !this.gerenciadorAutenticacaoService.getToken() ||
          !this.gerenciadorAutenticacaoService.getToken()
        ) {
          // // Redireciona para o login se o usuário não estiver autenticado

          // console.log(this.gerenciadorAutenticacaoService.getUsuario());
          // console.log(this.gerenciadorAutenticacaoService.getToken());
          // console.log(this.gerenciadorAutenticacaoService.getToken());


          // console.log('Usuário:', this.gerenciadorAutenticacaoService.getUsuario());
          // console.log('Token:', this.gerenciadorAutenticacaoService.getToken());
          // console.log('Usuário autenticado:', this.gerenciadorAutenticacaoService.getUsuarioAutenticado());
          // console.log('USUARIO NÃO ESTÁ LOGADO')

          this.router.navigate(['/login']);
          return false;
        }
        // console.log('Usuário:', this.gerenciadorAutenticacaoService.getUsuario());
        // console.log('Token:', this.gerenciadorAutenticacaoService.getToken());
        // console.log('Usuário autenticado:', this.gerenciadorAutenticacaoService.getUsuarioAutenticado());
        // console.log('LOGIN FEITO COM SUCESSO')

        return true;
    }



      // está funcionando (Ultimo)
      // if(this.gerenciadorAutenticacaoService.getUsuario() === '' || this.gerenciadorAutenticacaoService.getUsuario() === null ||
      // this.gerenciadorAutenticacaoService.getToken() === null && this.gerenciadorAutenticacaoService.getUsuarioAutenticado()===false) {
      //   // console.log('Login incorreto - redirecionando')  //{Debug}\\
      //   // this.router.navigate(['login'])

      //   return false;

      // } else {
      //   // console.log('status do usuarioAutenticado() dentro do canActivate no else --->>> ', this.gerenciadorAutenticacaoService.getUsuarioAutenticado())
      //   // console.log('Mensagem do AutenticacaoGuard: Usuario conseguiu autenticar? ', this.gerenciadorAutenticacaoService.getUsuarioAutenticado())
      //   return true;
      // }

  }





