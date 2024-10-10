import { LoginComponent } from './../../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticacaoService } from 'src/app/login/autenticacao.service';
import { Usuario } from 'src/app/login/usuario';
import { ErrorService } from '../error/error.service';
import { BehaviorSubject, interval, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAutenticacaoService {

  private logon: string = 'http://localhost:8080/login';
  private logout: string = 'http://localhost:8080/deslogar';
  private status: string = 'http://localhost:8080/status-login-get';


  private token: string = '';

  usuarioCache: string = '';

  dadosDoUsuario: { usuario: string } = {usuario: ''};
  listaDoUsuario: Array<any> ;
  private listaDoUsuarioSubject = new BehaviorSubject<any[]>([]);


  constructor(private http: HttpClient, private usuarioObjeto: Usuario) {
    this.listaDoUsuario = [];
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



            console.log('Lista de usuários após adicionar o novo usuário:', this.listaDoUsuario);

            const usuarioServer = usuario.login;
            this.usuarioCache = usuarioServer;



            this.setToken(response.token);

            // console.log(
            //   'Dados de autenticação:\n\n',
            //   'token: ',response.token,'\n',
            //   'usuario: ',usuario.login
            // )
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


getStatusPollUsuario(/*usuarioStorage: string | null*/): Observable<any> {


  // const userNameStatus: {} = { "login": usuarioStorage };
  console.log('Executando o pooling ...' )
  return interval(1500).pipe(
    switchMap(() => {
      return this.http.post<any>(this.status, null).pipe(
        tap((statusLogin: any) => {

          console.log('Status de autenticação desse usuário do servidor: ', statusLogin)
          // console.log('Usuario: ', userNameStatus)

          // if(statusLogin === true && localStorage.getItem('token') === null) {
          //   this.apiDeslogar(userNameStatus)
          // }
          // Implemente o código para manipular os equipamentos recebidos
          // console.log(equipamentos);   //{Debug}\\

        })
      );
    })
  );
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


get getNomeUsuarioCache(): string{
  return this.usuarioCache;
}


set setNomeUsuarioCache(data: string) {
  this.usuarioCache = data;
}





}
