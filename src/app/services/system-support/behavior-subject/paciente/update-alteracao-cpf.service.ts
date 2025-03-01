import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateAlteracaoCpfService {

  private booleanSource = new BehaviorSubject<boolean>(false);
  private status = new BehaviorSubject<boolean>(false);
  private unsubscribe$ = new Subject<void>(); // Subject para notificar a limpeza

  public boolean$ = this.booleanSource.asObservable();
  public statusObservable$ = this.status.asObservable();

  setBoolean(value: boolean): void {
    this.booleanSource.next(value);
  }

  setStatus(value: boolean): void {
    this.status.next(value);
  }

  getStatus(): boolean {
    return this.status.getValue();
  }

  getBoolean(): boolean {
    return this.booleanSource.getValue();
  }

  ngOnDestroy(): void {
    // Limpa todas as subscrições quando o serviço ou componente for destruído
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
