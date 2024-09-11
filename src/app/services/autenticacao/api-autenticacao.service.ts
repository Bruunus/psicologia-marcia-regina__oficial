import { LoginComponent } from './../../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticacaoService } from 'src/app/login/autenticacao.service';
import { Usuario } from 'src/app/login/usuario';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAutenticacaoService {

  private logon: string = 'http://localhost:8080/login';
  private logout: string = 'http://localhost:8080/deslogar';
  private status: string = 'http://localhost:8080/status-login';

  private token: string = '';

  private usuario: Usuario = new Usuario();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  }



  apiAutenticacao(usuario: Usuario): Promise<boolean> {

    // console.log('JSONData antes de enviar:', JSONData);     //{Debug}\\

    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>(this.logon, usuario).subscribe(
        (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', usuario.login);
            this.setToken(response.token);

            console.log(
              'Dados de autenticação:\n\n',
              'token: ',response.token,'\n',
              'usuario: ',usuario.login
            )
            // const usuarioLogado = localStorage.getItem('usuario');
            // if(usuarioLogado !== null) {
            //   this.usuario.setLogin(usuarioLogado)
            //   console.log('constante: ',usuarioLogado)
            //   console.log('Objeto Usuario', this.usuario.getLogin())
            // }
            resolve(true);
            return true;
          } else {
            resolve(false);
            return false;
          }
        },
        (error) => {
          // reject(error);
          return false;
      });
    })

  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }





apiDeslogar(user: string): Promise<boolean> {
  const usuario = { login: user };
  return new Promise<boolean>((resolve, reject) => {
    this.http.post<any>(this.logout, usuario).subscribe(
      (response) => {
        if(response.status === 200) {
          resolve(true);
        }
      }
    )
  })
}








}
