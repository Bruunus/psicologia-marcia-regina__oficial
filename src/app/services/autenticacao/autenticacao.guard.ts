import { AutenticacaoService } from './../../login/autenticacao.service';
import { LoginComponent } from '../../login/login.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  status: boolean = false;
  subscription: Subscription = new Subscription();

  constructor (private autenticacaoService: AutenticacaoService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // console.log(route)
      console.log('status do token dentro do canActivate, ', this.autenticacaoService.getToken())

      if(this.autenticacaoService.usuarioAutenticado() && this.autenticacaoService.getToken() != '' || this.autenticacaoService.getToken() != null) {
        return true;
      }
      console.log('Login incorreto - redirecionando')
      this.router.navigate(['login'])
      return false;




  }


  ngOnDestroy() {
    this.subscription.unsubscribe(); // Fecha o Observable para liberar memória
  }

}
