import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RedirectComponent } from '../redirect/redirect.component';
import { BehaviorSubject, Observable, takeLast } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';
import { Usuario } from './usuario';

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
export class LoginComponent implements OnInit {


  // isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private usuarioAutenticado: boolean = false;

  protected usuario: Usuario = new Usuario();



  constructor(private router: Router, private autenticacaoService: AutenticacaoService) {

  }


  ngOnInit(): void {};

  onLogin() {

    console.log(this.usuario)
    this.autenticacaoService.fazerLogin(this.usuario);

  }


  // fazerLogin(usuario: Usuario) {
  //   // Pausa do vídeo Loiane
  //   //  É aqui que chama a API
  //   if(usuario.login === 'bruno' && usuario.senha === '12345678') {
  //     this.usuarioAutenticado = true;

  //     this.router.navigate(['/page2'])
  //     console.log('Usuário autenticado: ',this.usuarioAutenticado)
  //   } else {
  //     this.usuarioAutenticado = false;
  //     console.log('Usuário autenticado: ',this.usuarioAutenticado)
  //   }

  // }


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
