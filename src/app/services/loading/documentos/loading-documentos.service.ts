import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingDocumentosService {

  private booleanSource = new BehaviorSubject<boolean>(false); // Valor inicial é false
  boolean$ = this.booleanSource.asObservable();

  setBoolean(value: boolean) {
    this.booleanSource.next(value); // Define o valor booleano
  }
}
