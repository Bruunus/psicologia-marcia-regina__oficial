import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CalculadorDeTelaModoDev {

  largura: number = 0;
  altura: number = 0;

  constructor() {
    this.atualizarTamanhoTela();
    this.eventoRedimensionamento();
  }

  atualizarTamanhoTela() {
    this.largura = window.innerWidth;
    this.altura = window.innerHeight;
  }

  private eventoRedimensionamento() {
    window.addEventListener('resize', () => {
      this.atualizarTamanhoTela();
    });
  }

}
