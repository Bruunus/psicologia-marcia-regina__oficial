import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingDocumentosService {

  private booleanSource = new BehaviorSubject<boolean>(false); // Valor inicial é false
  private renderizacaoSource = new BehaviorSubject<boolean>(false);
  public boolean$ = this.booleanSource.asObservable();
  public renderizacao$ = this.renderizacaoSource.asObservable();


  // VAMOS COMEÇAR TUDDO DE NOVO

  setBoolean(value: boolean) {
    this.booleanSource.next(value); // Define o valor booleano
  }

  setRenderizado(value: boolean) {
    this.renderizacaoSource.next(value); // Define o valor booleano
  }

  getRenderizado(): boolean {
    return this.renderizacaoSource.getValue();
  }

}


