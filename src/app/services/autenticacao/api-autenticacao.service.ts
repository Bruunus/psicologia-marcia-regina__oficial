import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiAutenticacaoService {

  private logon: string = 'http://localhost:8080/login';
  private logout: string = 'http://localhost:8080/deslogar';
  private statusUpdate: string = 'http://localhost:8080/status-update';


  private token: string = '';

  usuarioCache: string = '';

  dadosDoUsuario: { usuario: string } = {usuario: ''};
  listaDoUsuario: Array<any> ;



  constructor(private http: HttpClient, private router: Router) {
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


updateStatusLogoffUsuario(norepete: boolean): void {

  if(!norepete) {
    console.log("Logoff realizado")
  } else {

    // const userNameStatus: {} = { "login": usuarioStorage };
    alert('metodo updateStatusLogoffUsuario')
    this.http.get<any>(this.statusUpdate).pipe(
        tap((statusLogin: boolean) => {
          console.log('Status final: ', statusLogin)
          if(statusLogin)
            this.router.navigate(['ending-session']);
        })
      );

  }

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
