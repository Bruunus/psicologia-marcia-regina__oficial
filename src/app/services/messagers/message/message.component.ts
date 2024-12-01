import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { trigger, state, style, transition, animate, ɵPRE_STYLE } from '@angular/animations';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-error-message',
  template: `

    <div *ngIf="errorMessage" [ngClass]="alertClass" class="alert alert-dismissible fade show alert-error-message" role="alert" [@slideInOut]="isVisible ? 'in' : 'out'">
      {{ errorMessage }}
      <button type="button" class="close" (click)="closeError()" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

  `,
  styleUrls: ['../../../../styles.scss'],

  animations: [
    trigger('slideInOut',[
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      state('out', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition('in => out', animate('0.5s ease-in-out')),
      transition('out => in', animate('0.5s ease-in-out'))
    ])
  ]


})
export class MessageComponent implements OnInit {

  protected errorMessage: string | null = null;
  protected isVisible: boolean = false;
  private timeoutId: any;
  protected alertClass: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private errorService: MessageService) {

  }

  ngOnInit() {

    this.subscription.add(
      this.errorService.message$.subscribe(({message, type}) => {
        this.errorMessage = message;
        this.alertClass = this.typeAlert(type);
        this.isVisible = true;

        this.timeoutId = setTimeout(() => {
          this.closeError();
        }, 7000); // 5 segundos
      })
    );

    // Subscrição para fechar o erro via serviço
    this.errorService.close$.subscribe(() => {
      this.closeError(); // Chama o método closeError do componente
    });
  }




  closeError() {
    this.isVisible = false; // Inicia a animação de saída

    // Limpar a mensagem após a animação de saída
    setTimeout(() => {
      this.errorMessage = null;
    }, 500); // Tempo para a animação de saída
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  typeAlert(type: string): string {
    switch (type) {
      case 'ALERT_SUCCESS':
        return 'alert-success'
      case 'ALERT_ERROR':
        return 'alert-danger'; // Classe do Bootstrap para erro
      case 'ALERT_INFO':
        return 'alert-info'; // Classe do Bootstrap para informação
      case 'ALERT_ALERT':
        return 'alert-warning'; // Classe do Bootstrap para alerta
      default:
        return ''; // Classe padrão se o tipo não for reconhecido
    }
  }


  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

}
