
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AutenticacaoService } from '../login/autenticacao.service';
import { Usuario } from '../login/usuario';
import { TimeoutService } from '../login/timeout.service';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.scss']
})
export class Pagina2Component implements OnInit {

  nomeLogin: string | null = ''


  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService, private usuario: Usuario,
    private timeoutService: TimeoutService
  ) {

   }

  ngOnInit(): void {
    console.log('Inicio do timeout')
    this.timeoutService.initSessionTimeout();

    this.nomeLogin = localStorage.getItem('usuario')




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
