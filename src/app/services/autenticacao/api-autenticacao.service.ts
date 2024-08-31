import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';

@Injectable({
  providedIn: 'root',
})
export class ApiAutenticacaoService {

  private logon: string = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private usuario: Usuario) { }



  apiAutenticacao(usuario: Usuario): Promise<boolean> {

    // console.log('JSONData antes de enviar:', JSONData);     //{Debug}\\

    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>(this.logon, usuario).subscribe(
        (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('nomeUsuario', usuario.login);

            console.log(
              'Dados de autenticação:\n\n',
              'token: ',response.token,'\n',
              'usuario: ',usuario.login
            )

            this.usuario.setLogin(usuario.login);


            resolve(true);

            return true;
          } else {
            resolve(false);
            return false;
          }
        },
        (error) => {
          reject(error);
          return false;
      });
    })

}
}
