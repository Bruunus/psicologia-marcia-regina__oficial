import { MessageApiGenericsService } from '../message-api-generics.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-info-message',
  template: `

    <div *ngIf="infoMessage" class="alert alert-info alert-dismissible fade show alert-info-message" role="alert" [@slideInOut]="isVisible ? 'in' : 'out'">
      {{ infoMessage }}
      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

  `,
  styleUrls: ['../../../../../../styles.scss'],
  animations: [
    trigger('slideInOut',[
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      state('out', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition('in => out', animate('0.5s ease-in-out')),
      transition('out => in', animate('0.5s ease-in-out'))
    ])
  ]

})
export class DisplayInfoMessageComponent implements OnInit {

  infoMessage: string | null = '';
  isVisible: boolean = false;
  timeoutId: any;

  private subscription: Subscription = new Subscription();

  constructor(private messageApiService: MessageApiGenericsService) {

  }

  ngOnInit() {

    this.subscription.add(
      this.messageApiService.info$.subscribe((message) => {
        this.infoMessage = message;
        this.isVisible = true;

        this.timeoutId = setTimeout(() => {
          this.closeError();
        }, 4000); // 5 segundos
      })
    )

  }





  closeError() {
    this.isVisible = false; // Inicia a animação de saída

    // Limpar a mensagem após a animação de saída
    setTimeout(() => {
      this.infoMessage = null;
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
