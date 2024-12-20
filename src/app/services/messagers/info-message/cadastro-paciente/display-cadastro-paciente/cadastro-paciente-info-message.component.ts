import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageCadastroPacienteService } from '../message-cadastro-paciente.service';

@Component({
  selector: 'app-display-info-message-cadastro-paciente',
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
export class CadastroPacienteInfoMessageComponent implements OnInit {

  infoMessage: string | null = '';
  isVisible: boolean = false;
  timeoutId: any;

  private subscription: Subscription = new Subscription();

  constructor(private messageCadastroPacienteService: MessageCadastroPacienteService) {

  }

  ngOnInit() {

    this.subscription.add(
      this.messageCadastroPacienteService.info$.subscribe((message) => {
        this.infoMessage = message;
        this.isVisible = true;

        this.timeoutId = setTimeout(() => {
          this.closeMessage();
        }, 1000); // 5 segundos
      })
    )

  }

  closeMessage() {
    this.isVisible = false; // Inicia a animação de saída

    // Limpar a mensagem após a animação de saída
    setTimeout(() => {
      this.infoMessage = null;
    }, 400); // Tempo para a animação de saída
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }


}
