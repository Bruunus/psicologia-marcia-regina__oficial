import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription, using } from "rxjs";
import { ApiAutenticacaoService } from "../services/autenticacao/api-autenticacao.service";

@Injectable({
  providedIn: 'root'
})
export class CachePbservable {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  nomeLogin: string | null = '';
  subscription: Subscription = Subscription.EMPTY;
  contador: number = 0
  private updateStatusLogoffCalled = false;

  constructor(private apiAutenticacaoService: ApiAutenticacaoService) {

    let lastStorageEventTime = 0;

    window.addEventListener('storage', (event) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastStorageEventTime < 500) {
        // Se o evento foi disparado há menos de 500ms, ignora-o
        return;
      }
      lastStorageEventTime = currentTime;
      const status = this.checkToken();
      if (!status) {
        setTimeout(() => {
          if (!this.updateStatusLogoffCalled) {
            alert("Os dados de sessão do sistema foram excluídos. Será necessário fazer login novamente!");
            this.apiAutenticacaoService.updateStatusLogoffUsuario(true);
            this.contador++
            console.log('Repetição do evento: ', this.contador)
            this.updateStatusLogoffCalled = true;
          }
        }, 0);
      }
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
