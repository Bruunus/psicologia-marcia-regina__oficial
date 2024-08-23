import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutenticacaoInterface } from 'src/model/interfaces/autenticacaoInterface';
import { RedirectComponent } from '../redirect/redirect.component';
import { BehaviorSubject, Observable, takeLast } from 'rxjs';
import { Usuario } from 'src/model/interfaces/usuario';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-pagina1',
  templateUrl: './login.component.html',
  styleUrls: [
    './style-big-responsive.scss',
    './style-middle-responsive.scss',
    './style-small-responsive.scss',
    '../../styles.scss'
  ]
})
export class LoginComponent implements OnInit, CanActivate {


  // isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private usuarioAutenticado: boolean = false;

  protected usuario: Usuario = new Usuario();

  autenticacao: AutenticacaoInterface = {
    login: '',
    senha: ''
  }

  constructor(private router: Router) {

  }


  ngOnInit(): void {

  };





  onLogin() {

    console.log(this.usuario)
    this.fazerLogin(this.usuario);


    // console.log('Autenticação: ', this.autenticacao);




  }


  fazerLogin(usuario: Usuario) {
    // Pausa do vídeo Loiane
    //  É aqui que chama a API
    if(usuario.login === 'brunus' && usuario.senha === '123') {
      this.usuarioAutenticado = true;
      console.log('Usuário autenticado: ',this.usuarioAutenticado)
      this.router.navigate(['laudos/page2/'])
    } else {
      this.usuarioAutenticado = false;
      console.log('Usuário autenticado: ',this.usuarioAutenticado)
    }

  }




  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


        return false;








  }

  statusAutenticacao() {
    return this.usuarioAutenticado;
  }








  // getAutenticado(): Observable<boolean> {
  //   return this.isAuthenticated.asObservable();
  // }

  // setAutenticado(value: boolean) {
  //   this.isAuthenticated.next(value);
  // }



}
