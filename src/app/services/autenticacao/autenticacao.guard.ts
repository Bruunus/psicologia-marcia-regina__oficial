import { AutenticacaoService } from './../../login/autenticacao.service';
import { LoginComponent } from '../../login/login.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CachePbservable } from 'src/app/login/cache-observable.service';

@Injectable()
export class AutenticacaoGuard  {

  status: boolean = false;
  subscription: Subscription = new Subscription();

  constructor (private autenticacaoService: AutenticacaoService, private router: Router, private cachePbservable: CachePbservable) {
    this.cachePbservable.checkToken();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // console.log('status do usuarioAutenticado() dentro do canActivate, ', this.autenticacaoService.getUsuarioAutenticado())

      if(localStorage.getItem('token') === '' || localStorage.getItem('token') === null && this.autenticacaoService.getUsuarioAutenticado()===false) {
        // console.log('Login incorreto - redirecionando')  //{Debug}\\
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
