
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AutenticacaoService } from '../login/autenticacao.service';
import { Usuario } from '../login/usuario';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.scss']
})
export class Pagina2Component implements OnInit {

  nomeLogin: string = this.usuario.getLogin();


  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService, private usuario: Usuario) {

   }

  ngOnInit(): void {

    // this.nomeLogin = this.usuario.getLogin()
    console.log('Logado: ', this.usuario.getLogin())



  }


  logout() {
    this.autenticacaoService.deslogar();
  }


  // getFrutas() {
  //   this.http.get<any[]>('http://localhost:8080/api/list').subscribe(
  //     response => {
  //       this.frutas = response;
  //     },
  //     error => {

  //       console.error(error);
  //     }
  //   );
  // }

}
