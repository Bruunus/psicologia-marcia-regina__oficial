import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  get unsubscribe() {
    return this.unsubscribe$;
  }

  ngOnDestroy(): void {
    // console.log(' Serviço de Unsubscribe chamado!');
    this.unsubscribe$.next();  // Notifica os Observers para cancelarem assinaturas
    this.unsubscribe$.complete(); // Finaliza o Subject

  }

}
