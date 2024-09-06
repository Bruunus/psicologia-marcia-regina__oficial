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

      // console.log('status do usuarioAutenticado() dentro do canActivate, ', this.autenticacaoService.getUsuarioAutenticado())

      if(localStorage.getItem('token') === '' || localStorage.getItem('token') === null && this.autenticacaoService.getUsuarioAutenticado()===false) {
        // console.log('Login incorreto - redirecionando')
        this.router.navigate(['login'])
        return false;

      } else {
        // console.log('status do usuarioAutenticado() dentro do canActivate no else --->>> ', this.autenticacaoService.getUsuarioAutenticado())
        return true;
      }

  }


  ngOnDestroy() {
    this.subscription.unsubscribe(); // Fecha o Observable para liberar memória
  }

}
