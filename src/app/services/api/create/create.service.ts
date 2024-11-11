import { ErrorService } from './../../error/error.service';
import { MessageApiService } from './../../messagers/info-message/message-api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PacienteInterface } from 'src/app/model/paciente-interface';
import { GerenciadoDeAutenticacaoService } from '../../sessao/gerenciador-de-autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  private registarOfPatient: string = 'http://localhost:8080/cadastro/paciente';
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient, private messageApiService: MessageApiService,
    private errorMessage: GerenciadoDeAutenticacaoService
  ) { }



  /**
   * Registra um novo paciente no sistema.
   *
   * Este método faz uma requisição HTTP POST para o servidor para cadastrar um paciente.
   * Se a requisição for bem-sucedida e o status da resposta for 200, o método resolve a Promise
   * com o valor true. Caso contrário, ou se ocorrer um erro durante a requisição, a Promise é rejeitada
   * com o valor false.
   *
   * @param {PacienteInterface} patient - O objeto que representa os dados do paciente a ser cadastrado.
   * @returns {Promise<boolean>} - Uma Promise que resolve para true se o paciente foi cadastrado com sucesso,
   * ou rejeita para false em caso de erro.
   *
   * @throws {Error} - Lança um erro se a requisição falhar ou se o status da resposta não for 200.
  */
  registerPatient(patient: PacienteInterface): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    this.http.post<PacienteInterface>(this.registarOfPatient, patient, { observe: 'response' })
      .pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (response: HttpResponse<PacienteInterface>) => {
          if (response && response.status === 200) {
            console.log(response.status);
            // Aciona o serviço de mensagem e declare
            console.log('Paciente cadastrado com sucesso.');
            this.messageApiService.setInfoMessage('Paciente cadastrado com sucesso.');
            // Paciente cadastrado com sucesso
            resolve(true);
            } else {
              // Se o status não for 200, você pode tratar isso aqui
              console.warn('Status inesperado:', response.status);
              reject(false);
            }
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          this.errorMessage.setErrorMessage('Erro ao cadastrar paciente: ' + err.message);
          reject(false);
        }
      });
  });
}


  ngOnDestroy() {
    // Emite um valor para cancelar todas as assinaturas
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
