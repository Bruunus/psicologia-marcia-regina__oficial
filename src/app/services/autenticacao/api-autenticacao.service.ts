import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { tap } from 'rxjs';
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

    return new Promise<boolean>(() => {
      this.http.post<any>(this.logon, usuario).subscribe(
        (response) => {
          if (response && response.token) {
            const username = response.usuario;
            this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(true);
            this.gerenciadoDeAutenticacaoService.setToken(response.token);
            this.gerenciadoDeAutenticacaoService.setUsuario(usuario.login);
            // console.log('Usuario: ', usuario.login);

            return true;
          } else {
            console.log('Não foi possível logar');
            this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(false);
             return false;
          }
        },
        (error: HttpErrorResponse) => {
          const status = error.status; // Aqui você acessa o status do erro
          if(status === 0 && error.statusText === 'Unknown Error') {
            this.gerenciadoDeAutenticacaoService.setErrorMessage('O servidor está fora do ar, por favor contate o adminsitrador');
          } else if(status === 401 && error.error === 'senha_incorreta') {
            this.gerenciadoDeAutenticacaoService.
              setErrorMessage('Senha incorreta')
          } else if(status === 401 && error.error === 'usuario_ja_logado') {
            this.gerenciadoDeAutenticacaoService.
              setErrorMessage('Acesso negado, este usuário já está logado')
          } else if(status === 401 && error.error === 'usuario_inexiste') {
            this.gerenciadoDeAutenticacaoService.
              setErrorMessage('Usuário inexistente')
          }
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
