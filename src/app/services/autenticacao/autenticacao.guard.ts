import { LoginComponent } from './../../login/login.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  constructor (private loginComponent: LoginComponent, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // console.log(route)
      // console.log(state)

    if(this.loginComponent.autenticado()) {

      console.log('user autenticado => Valor de autenticação: ', this.loginComponent.isAuthenticated);
      // this.router.navigate([''])
      // this.router.navigate(['laudos/page2'])

      return true;

    } else {

      console.log('user não autenticado => Valor de autenticação: ', this.loginComponent.isAuthenticated)
      this.router.navigate(['login'])

      return false;

    }


  }

}
