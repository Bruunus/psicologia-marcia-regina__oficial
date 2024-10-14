import { TimeoutService } from './timeout.service';
import { ApiAutenticacaoService } from '../autenticacao/api-autenticacao.service';
import { Router } from '@angular/router';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Usuario } from '../../login/usuario';
import { interval, Subscription } from 'rxjs';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class GerenciadoDeAutenticacaoService {

  private token: string = '';
  private usuario: string = '';
  private usuarioAutenticado: boolean = false;

  constructor(private router: Router) {  }



  initObservadorLocalStorage(): void {
    window.addEventListener('storage', (event) => {
      this.router.navigate(['ending-session']);
    });
    setInterval(() => {
      console.log('Observando LocalStorage com timeout')
    },2500)
  }


  getToken(): string {
    return this.token || localStorage.getItem('token')!;
  }

  getUsuario(): string {
    return this.usuario || localStorage.getItem('usuario')!;
  }

  getUsuarioAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  setUsuario(username: string) {
    this.usuario = username;
    localStorage.setItem('username', username);
  }

  setUsuarioAutenticado(status: boolean): void {
    this.usuarioAutenticado = status;
  }

  clearUserData() {
    this.token = '';
    this.usuario = '';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }



}
