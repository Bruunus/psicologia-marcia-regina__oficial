import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { IdentificacaoUpdatePacienteInterface } from 'src/app/model/documentos/identificacao/indentificacao-update-paciente-interface';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { MessageService } from 'src/app/services/messagers/message/message.service';
import { UnsubscribeService } from 'src/app/services/system-support/unsubscribes/unsubscribe.service';
import { UrlService } from 'src/app/services/url-service/url.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private unsubscribe$ = new Subject<void>();


  constructor(
    private http: HttpClient, private userMessage: MessageService, private urlService: UrlService,
    private unsubscribe: UnsubscribeService, private cacheService: PacienteCacheService
  ) { }


  updatePatient(dataUpdate: IdentificacaoUpdatePacienteInterface): Observable<IdentificacaoUpdatePacienteInterface | null> {
    return this.http.put<IdentificacaoUpdatePacienteInterface>(
      this.urlService.urlUpdatePaciente,
      dataUpdate,
      { observe: 'response' } // Retorna um HttpResponse
    ).pipe(
      takeUntil(this.unsubscribe$), // Se this.unsubscribe$ for um Subject<void>
      tap((response: HttpResponse<IdentificacaoUpdatePacienteInterface>) => {
        if (response.status === 200 && response.body) {
          this.cacheService.setPacienteCache(response.body);
          this.cacheService.setStatusCaching(true);
          this.userMessage.setMessage('Dados atualizado com sucesso','ALERT_SUCCESS');
        } else {
          this.userMessage.setMessage('Não foi possível realizar esta atualização', 'ALERT_ERROR');
        }
      }),
      map((response: HttpResponse<IdentificacaoUpdatePacienteInterface>) => response.body ?? null), // Extrai o corpo corretamente
      catchError((error: HttpErrorResponse) => {
        this.userMessage.setMessage(`Erro ${error.status}: ${error.message}`, 'ALERT_ERROR');
        return of(null); // Retorna null em caso de erro
      })
    );
  }



  // updatePatient(dataUpdate: IdentificacaoUpdatePacienteInterface): Observable<IdentificacaoUpdatePacienteInterface | null> {
  //   return this.http.put<IdentificacaoUpdatePacienteInterface>(
  //    this.urlService.urlUpdatePaciente, dataUpdate, { observe: 'response' })
  //     .pipe(
  //       takeUntil(this.unsubscribe.unsubscribe),
  //       tap((response: HttpResponse<IdentificacaoUpdatePacienteInterface>) => {
  //         if (response.status === 200 && response.body) {
  //           this.cacheService.setPacienteCache(response.body);
  //           this.cacheService.setStatusCaching(true);
  //         } else {
  //           this.userMessage.setMessage('Não foi possível realizar esta atualização', 'ALERT_ERROR');
  //           this.userMessage.getMessage();
  //         }
  //       }),
  //       map(response => response.body ?? null) {

  //       }
  //     )
  // }


}
