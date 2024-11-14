import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // mensagens de erros
  ERROR_SEACH_PATIENT: string = 'Não foi possível encontrar o paciente';


  private messageSubject = new Subject<{ message: string, type: string }>();
  private closeSubject = new Subject<void>();

  public message$ = this.messageSubject.asObservable();
  public close$ = this.closeSubject.asObservable();



  setMessage(message: string, type: string) {
    this.messageSubject.next({ message, type }); // Use 'message' em vez de 'errorMessage'
  }

  getMessage(): Observable<{ message: string, type: string }> {
    return this.messageSubject.asObservable();
  }

  closeMessage() {
    this.closeSubject.next(); // Notifica que o erro deve ser fechado
  }


}
