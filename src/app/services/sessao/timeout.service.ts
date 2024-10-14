import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GerenciadoDeAutenticacaoService } from './gerenciador-de-autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {

  private timeout: any;
  private readonly SESSION_TIMEOUT = 15 * 60 * 1000;   /* 15 minutos - Tempo padrão usado */
  // private readonly SESSION_TIMEOUT = 10 * 1000;   /* 10 segundos - Para testes*/

  constructor(private router: Router, private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService) {

   }

   /**
    * Metodo invocado para inicio de contagem do timeout.
    * Este método inicia redefinindo o tempo limite d sessão através do metodo resetSessionTimeout().
    * Este metodo segue escutando os eventos do mouse e teclado para capturar a inatividade, quando
    * qualquer um dos eventos ocorre, então ele zera o tempo de inatividade da contagem da sessão.
    */
   initSessionTimeout() {
    this.resetSessionTimeout();
    this.gerenciadoDeAutenticacaoService.initObservadorLocalStorage()
    document.addEventListener('mousemove', () => this.resetSessionTimeout());
    document.addEventListener('keypress', () => this.resetSessionTimeout());
    document.addEventListener('click', () => this.resetSessionTimeout());
   }


   /**
    * Este método é invocado pelo método initSessionTimeout() para detectar a inatividade do sistema.
    * Quanto é executado ele zera o tempo de inatividade, e, define um novo timeout com o setTimeout()
    * usando o memso tempo limit definido no SESSION_TIMEOUT. Se caso o timeout expirar então ele
    * realiza o logout.
    */
   private resetSessionTimeout() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (localStorage.getItem('token')) {
        this.logout();    /* falta atualizar no servidor o logout do usuario */
      }
    }, this.SESSION_TIMEOUT);

   }

   /**
    * O método logou é chamado dentro do metodo resetSessionTimeout() que terá a função de remover o token,
    * atualizar a página e redirecionar para a tela de login
    */
   private logout() {
    this.router.navigate(['ending-session']);
   }
}
