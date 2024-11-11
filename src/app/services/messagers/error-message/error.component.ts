import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { trigger, state, style, transition, animate, ɵPRE_STYLE } from '@angular/animations';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-error-message',
  template: `

    <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show alert-error-message" role="alert" [@slideInOut]="isVisible ? 'in' : 'out'">
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
export class ErrorComponent implements OnInit {

  errorMessage: string | null = null;
  isVisible: boolean = false;
  timeoutId: any;

  private subscription: Subscription = new Subscription();

  constructor(private errorService: ErrorService) {

  }

  ngOnInit() {

    this.subscription.add(
      this.errorService.error$.subscribe((message) => {
        this.errorMessage = message;
        this.isVisible = true;

        this.timeoutId = setTimeout(() => {
          this.closeError();
        }, 4000); // 5 segundos
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


  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

}
