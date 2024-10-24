import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { GerenciadoDeAutenticacaoService } from '../sessao/gerenciador-de-autenticacao.service';

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



  constructor(private http: HttpClient, private router: Router, private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService) {
    this.listaDoUsuario = [];
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  }



  apiAutenticacao(usuario: Usuario): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>(this.logon, usuario).subscribe(
        (response) => {
          if (response && response.token) {
            const username = response.usuario;
            this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(true);
            this.gerenciadoDeAutenticacaoService.setToken(response.token);
            this.gerenciadoDeAutenticacaoService.setUsuario(usuario.login);
            // console.log('Usuario: ', usuario.login);
            resolve(true);
            return true;
          } else {
            // console.log('Usuario não autenticado: ', usuario.login)
            this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(false);
            resolve(false);
            return false;
          }
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
          console.log('Usuario deslogado: ', usuario.login)
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
