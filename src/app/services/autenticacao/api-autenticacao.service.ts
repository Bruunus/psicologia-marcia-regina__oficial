import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/login/usuario';
import { catchError, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { GerenciadoDeAutenticacaoService } from '../sessao/gerenciador-de-autenticacao.service';
import { UrlService } from '../url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAutenticacaoService {




  private token: string = '';
  private unsubscribe$ = new Subject<void>();
  usuarioCache: string = '';

  dadosDoUsuario: { usuario: string } = {usuario: ''};
  listaDoUsuario: Array<any> ;



  constructor(
    private http: HttpClient, private router: Router, private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService,
    private urlService: UrlService) {
    this.listaDoUsuario = [];
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }




  }


  apiAutenticacao(usuario: Usuario): Observable<boolean> {
    return this.http.post<any>(this.urlService.urlLogin, usuario).pipe(
      takeUntil(this.unsubscribe$),
      map(response => {
        if (response && response.token) {
          this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(true);
          this.gerenciadoDeAutenticacaoService.setToken(response.token);
          this.gerenciadoDeAutenticacaoService.setUsuario(usuario.login);
          return true; // Autenticação bem-sucedida
        } else {
          console.log('Não foi possível logar');
          this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(false);
          return false; // Autenticação falhou
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const status = error.status; // Aqui você acessa o status do erro
        if (status === 0 && error.statusText === 'Unknown Error') {
          this.gerenciadoDeAutenticacaoService.setErrorMessage('Servidor offline, contate o administrador');
        } else if (status === 401) {
          const message401 = error.error;
          switch (message401) {
            case 'senha_incorreta':
              this.gerenciadoDeAutenticacaoService.setErrorMessage('Senha incorreta');
              break;
            case 'usuario_inexistente':
              this.gerenciadoDeAutenticacaoService.setErrorMessage('Usuário inexistente');
              break;
            case 'usuario_ja_logado':
              this.gerenciadoDeAutenticacaoService.setErrorMessage('Acesso negado, este usuário já está logado');
              break;
            default:
              break;
          }
        }
        return of(false); // Retorna um Observable com false em caso de erro
      })
    );
  }



  //


  // apiAutenticacao(usuario: Usuario): Promise<boolean> {
  //   return new Promise<boolean>((resolve) => {
  //     this.http.post<any>(this.logon, usuario)
  //       .pipe(takeUntil(this.unsubscribe$)) // Cancela a assinatura quando unsubscribe$ emite
  //       .subscribe({
  //         next: (response) => {
  //           if (response && response.token) {
  //             const username = response.usuario;
  //             this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(true);
  //             this.gerenciadoDeAutenticacaoService.setToken(response.token);
  //             this.gerenciadoDeAutenticacaoService.setUsuario(usuario.login);
  //             resolve(true); // Resolve a Promise com true
  //           } else {
  //             console.log('Não foi possível logar');
  //             this.gerenciadoDeAutenticacaoService.setUsuarioAutenticado(false);
  //             resolve(false); // Resolve a Promise com false
  //           }
  //         },
  //         error: (error: HttpErrorResponse) => {
  //           const status = error.status; // Aqui você acessa o status do erro
  //           if (status === 0 && error.statusText === 'Unknown Error') {
  //             this.gerenciadoDeAutenticacaoService.setErrorMessage('Servidor offline, contate o administrador');
  //           } else if (status === 401) {
  //             const message401 = error.error;
  //             switch (message401) {
  //               case 'senha_incorreta':
  //                 this.gerenciadoDeAutenticacaoService.setErrorMessage('Senha incorreta');
  //                 break;
  //               case 'usuario_inexistente':
  //                 this.gerenciadoDeAutenticacaoService.setErrorMessage('Usuário inexistente');
  //                 break;
  //               case 'usuario_ja_logado':
  //                 this.gerenciadoDeAutenticacaoService.setErrorMessage('Acesso negado, este usuário já está logado');
  //                 break;
  //               default:
  //                 break;
  //             }
  //           }
  //           resolve(false); // Resolve a Promise com false em caso de erro
  //         }
  //       });
  //   });
  // }

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
    this.http.get<any>(this.urlService.urlStatusUpdate).pipe(
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
  return new Promise<boolean>((resolve) => {
    this.http.post<any>(this.urlService.urlLogout, usuario).subscribe(
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


ngOnDestroy() {
  // Emite um valor para cancelar todas as assinaturas
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}



}
