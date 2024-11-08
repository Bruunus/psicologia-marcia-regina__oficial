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



  registerPatient(patient: PacienteInterface): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>(this.registarOfPatient, patient)
      .pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (response: HttpResponse<PacienteInterface>) => {
          if(response && response.status === 200) {
            // aciona o serviço de mensagem e declare
            this.messageApiService.setInfoMessage('Paciente cadastrado com sucesso.')
            // Paciente cadastrado com sucesso
            resolve(true)
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
