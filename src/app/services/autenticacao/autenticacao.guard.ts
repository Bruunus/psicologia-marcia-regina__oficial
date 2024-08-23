import { LoginComponent } from '../../login/login.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  status: boolean = false;
  subscription: Subscription = new Subscription();

  constructor (private loginComponent: LoginComponent, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // console.log(route)
      // console.log(state)

      if(this.loginComponent.statusAutenticacao()) {

        return true;


      }
      this.router.navigate(['login'])
      return false;




  }


  ngOnDestroy() {
    this.subscription.unsubscribe(); // Fecha o Observable para liberar memória
  }

}
