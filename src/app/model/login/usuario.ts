import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Usuario {
  login: string = '';
  senha: string = '';


  public getLogin() {
    return this.login;
  }

  public setLogin(usuario: string) {
    this.login = usuario
  }
}

