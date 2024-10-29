import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  // mensagens de erros
  ERROR_SEACH_PATIENT: string = 'Não foi possível encontrar o paciente';


  private errorSubject = new Subject<string>();
  private closeSubject = new Subject<void>();

  public error$ = this.errorSubject.asObservable();
  close$ = this.closeSubject.asObservable();



  constructor() { }



  showError(errorMessage: string) {
    this.errorSubject.next(errorMessage);
  }

  // getError(): Observable<string> {
  //   return this.errorSubject.asObservable();
  // }

  closeError() {
    this.closeSubject.next(); // Notifica que o erro deve ser fechado
  }




/*   Classe typescript responsável por fazer aparecer a mensagem

  public alertError(): void {

    const containerPai = document.querySelector('#container-pai');
    const template = `
      <div class="alert alert-danger" role="alert">
        <span class="close-button">&times;</span>
        Erro ocorrido ao enviar os dados!
      </div>
    `;
    containerPai.insertAdjacentHTML('beforeend', template);

    const divAlertError = document.querySelector('.alert-danger') as HTMLDivElement;
    const closeButton = divAlertError.querySelector('.close-button');


    if(window.matchMedia("(max-width: 843px) and (min-width: 376px)").matches) {
        divAlertError.style.transform = 'translate(-50%, 0)';
        divAlertError.style.top = '10px';
        divAlertError.style.left = '50%';
        divAlertError.style.right = 'auto';


        if(window.matchMedia("(max-width: 375px)").matches) {
            divAlertError.textContent = 'Erro ao enviar!';
            divAlertError.style.textAlign = 'center';
        }


        closeButton.addEventListener('click', () => {
            divAlertError.style.opacity = '0';
            setTimeout(() => {
                divAlertError.parentNode.removeChild(divAlertError);
            }, 500); // Tempo de animação de fade
        });

        setTimeout(() => {
            divAlertError.style.opacity = '1';
        }, 0);

        setTimeout(() => {
            divAlertError.style.opacity = '0';
            setTimeout(() => {
                divAlertError.parentNode.removeChild(divAlertError);
            }, 500); // Tempo de animação de fade
            }, 5000);


    }  else {

        divAlertError.style.transform = 'translateX(100%)';
        divAlertError.style.bottom = '10px';
        divAlertError.style.right = '10px';
        divAlertError.style.opacity = '0';

        closeButton.addEventListener('click', () => {
            divAlertError.style.opacity = '0';
            divAlertError.style.transform = 'translateX(100%)';
            setTimeout(() => {
            divAlertError.parentNode.removeChild(divAlertError);
            }, 500); // Tempo de animação de fade
        });

        setTimeout(() => {
            divAlertError.style.opacity = '1';
            divAlertError.style.transform = 'translateX(0)';
        }, 0);

        setTimeout(() => {
            divAlertError.style.opacity = '0';
            divAlertError.style.transform = 'translateX(100%)';
            setTimeout(() => {
            divAlertError.parentNode.removeChild(divAlertError);
            }, 500); // Tempo de animação de fade
        }, 5000);

    }



    */

}
