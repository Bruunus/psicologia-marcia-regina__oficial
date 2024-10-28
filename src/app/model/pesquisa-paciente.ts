import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PesquisaPaciente {

  parametro: string = '';

  public getParametroPesquisa() {
    return this.parametro;
  }

  public setParametroPesquisa(parametro: string) {
    this.parametro = parametro
  }

}
