import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticacaoInterface } from "src/model/interfaces/autenticacaoInterface";

@Injectable()
export class AutenticacaoService {

  constructor(private router: Router) {}

  login(autenticacao: AutenticacaoInterface): void {


    console.log('dados que veio da autenticação: ', autenticacao)

    // Lógica de autenticação (pode ser uma chamada HTTP, validação local, etc.)
    const isAuthenticated = true; // Exemplo simplificado de autenticação

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']); // Redireciona para a rota '/dashboard' após o login
    } else {
      // Tratar caso de login inválido
    }
  }

}
