import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {

  private message: string = ''
  private infoSubject = new Subject<string>();
  private closeSubject = new Subject<void>();

  public info$ = this.infoSubject.asObservable();
  public close$ = this.closeSubject.asObservable();



  showInfo(errorMessage: string) {
    this.infoSubject.next(errorMessage);
  }

  closeInfo() {
    this.closeSubject.next(); // Notifica que o erro deve ser fechado
  }

  setInfoMessage(message: string): void {
    this.infoSubject.next(message);
  }

}
