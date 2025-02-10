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

  setBoolean(value: boolean) {
    this.booleanSource.next(value); // Define o valor booleano
  }

  getBoolean(): boolean {
    return this.booleanSource.getValue();
  }

  setRenderizado(value: boolean) {
    this.renderizacaoSource.next(value); // Define o valor booleano
  }

  getRenderizado(): boolean {
    return this.renderizacaoSource.getValue();
  }

  clearLoading(): void {
      localStorage.removeItem('paciente');
      // this.pacienteSubject.next(null);
      this.booleanSource.complete();
      this.booleanSource = new BehaviorSubject<boolean>(false);
    }


}


