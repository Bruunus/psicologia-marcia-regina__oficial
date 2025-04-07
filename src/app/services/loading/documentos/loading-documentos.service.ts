import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingDocumentosService {

  private booleanSource = new BehaviorSubject<boolean>(false); // Valor inicial é false
  private renderizacaoSource = new BehaviorSubject<boolean>(false);
  public boolean$ = this.booleanSource.asObservable();
  public renderizacao$ = this.renderizacaoSource.asObservable();
  private unsubscribe$ = new Subject<void>();


  // VAMOS COMEÇAR TUDDO DE NOVO

  setBoolean(value: boolean) {
    this.booleanSource.next(value); // Define o valor booleano
  }

  getBoolean() {
    return this.booleanSource.getValue();
  }

  setRenderizado(value: boolean) {
    this.renderizacaoSource.next(value); // Define o valor booleano
  }

  getRenderizado(): boolean {
     let c = this.renderizacaoSource.getValue();
     console.log(c)
     return c

  }

  ngOnDestroy(): void {
    // Limpa todas as subscrições quando o serviço ou componente for destruído
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}


