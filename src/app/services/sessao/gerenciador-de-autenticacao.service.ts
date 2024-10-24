import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GerenciadoDeAutenticacaoService {

  private token: string = '';
  private usuario: string = '';
  private usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }



  initObservadorLocalStorage(): void {
    window.addEventListener('storage', () => {
      this.router.navigate(['ending-session']);
    });
    setTimeout(() => {
      console.log('Observando LocalStorage com timeout')
    },2500)
  }


  getToken(): string {
    return this.token || localStorage.getItem('token')!;
  }

  getTokenNative(): string {
    return localStorage.getItem('token')!;
  }

  getUsuario(): string {
    return this.usuario || localStorage.getItem('usuario')!;
  }

  getUsuarioAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  setToken(token: any) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  setUsuario(usuario: string) {
    this.usuario = usuario;
    localStorage.setItem('usuario', usuario);
  }

  setUsuarioAutenticado(status: boolean): void {
    this.usuarioAutenticado = status;
  }

  clearUserData() {
    this.token = '';
    this.usuario = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }



}
