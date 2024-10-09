import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, using } from "rxjs";
import { ApiAutenticacaoService } from "../services/autenticacao/api-autenticacao.service";

@Injectable({
  providedIn: 'root'
})
export class CachePbservable {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  nomeLogin: string | null = '';

  constructor(private router: Router, private apiAutenticacaoService: ApiAutenticacaoService) {
    window.addEventListener('storage', () => {
      // const valorChaveExcluida = localStorage.getItem('usuario')!;
      // this.nomeLogin = valorChaveExcluida;
      const test = this.apiAutenticacaoService.getNomeUsuarioCache;
      console.log("Valor do cache da API: ", test)

      const status = this.checkToken();
      if(!status) {
        /* Alerta temporário até a criação das Exceptions de erro */
        /*
          Mesmo após a implantação, precisa testar novamente em outros componentes para
          verificar se está de fato funcionando, o teste é:
            * Faça login normalmente
            * Exclua o cache e cokies do navegador
            * Observe se a mensagem de erro aparecerá
        */
        alert("Os dados de sessão do sistema foram excluídos. Será necessário fazer login novamente!");

        this.apiAutenticacaoService.apiDeslogar(this.nomeLogin!); /* Necessário para atualizar o banco em tempo de execução */
        this.router.navigate(['ending-session']);
      }   // AINDA COM PROBLEMA DE NÃO ESTAR ATUALIZANDO O BANCO DE DADOS
    });
  }


  checkToken(): boolean {
    const token = localStorage.getItem('token');


    if (!token) {
      this.loggedIn.next(false);
      return false;
    }
     this.loggedIn.next(true);
     return true;
  }



}
