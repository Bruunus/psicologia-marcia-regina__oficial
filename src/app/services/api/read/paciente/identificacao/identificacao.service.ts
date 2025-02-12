import { IdentificacaoPacienteInterface } from './../../../../../model/documentos/identificacao/identificacao-paciente-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { UrlService } from 'src/app/services/url-service/url.service';

@Injectable({
  providedIn: 'root'
})
export class IdentificacaoService {

  private unsubcribe$ = new Subject<void>();


  constructor(private http: HttpClient, private urlService: UrlService, private cacheService: PacienteCacheService) { }


  /**
   * Acesso a API para recuperar os dados do paciente cadastrado via CPF.
   * Inicialmente verifica se existe um CPF presente pois não será possível realizar a
   * requisição sem o mesmo. Temos dois tipos de retorno: Para cache e para nova reqiusição.
   * No retorno da requisição é realizado a tentativa de recuperar e verificar se existe o
   * ultimo cache, pois eles são armazenados em starage para persistência. Se houver um cache do
   * objeto pacienteCache então o mesmo e retornado para uso, porém se caso não houve (Em caso de
   * novo acesso do usuário) ele cai para o próximo retorno. O segundo retorno realiza uma requisição
   * para trazer os dados da API pelo CPF informado. Os dados são armazenados em cache em caso de
   * status code 200. É esperado que o subscribe seja já executado pelo cliente no mesmo método que
   * chama esta função. Caso houve falha na requisição o método map cria um novo observable nulo e
   * emite a mensagem de erro.
   *
   * @returns Lista do paciente solicitado via CPF
   */
  carregarPaciente(cpf: string): Observable<IdentificacaoPacienteInterface | null> {
    if (!cpf) {
        console.warn('CPF não detectado');
        return of(null);
    }

    // Chamada à API para carregar o paciente
    return this.http.post<IdentificacaoPacienteInterface>(
        this.urlService.urlDadosDoPaciente, cpf, { observe: 'response' }
    ).pipe(
        tap((response) => {
            if (response.status === 200 && response.body) {
                // console.log('Paciente carregado e armazenado em cache:', response.body);
                this.cacheService.setPacienteCache(response.body);
                this.cacheService.setStatusCaching(true); // avisando que tem dados no cache
            }
        }),
        map((response) => response.status === 200 ? response.body : null), // Transforma resposta
        catchError((error) => {
            console.error('Erro ao carregar paciente', error);
            return of(null);
        })
    );
  }
  // carregarPaciente(cpf: string): Observable<IdentificacaoPacienteInterface | null> {

  //   if (!cpf) {
  //     console.warn('CPF não detectado');
  //     /* 1° return */
  //     return of(null);
  //   }

  //   /* 2° return */
  //   return this.cacheService.getPacienteCache().pipe(
  //     take(1), // 👈 Pega apenas o valor atual e finaliza
  //     switchMap((pacienteCache) => {
  //       if (pacienteCache) {
  //         console.log('Retornando dados do cache:' /*, pacienteCache*/);
  //         // alert('Retornando dados do cache');
  //         return of(pacienteCache);
  //       }

  //       /* 3° return */
  //       return this.http.post<IdentificacaoPacienteInterface>(
  //         this.urlService.urlDadosDoPaciente, cpf, { observe: 'response' }
  //       ).pipe(
  //         tap((response) => {
  //           if (response.status === 200 && response.body) {
  //             console.log('Paciente carregado e armazenado em cache:', response.body);
  //             this.cacheService.setPacienteCache(response.body);
  //           }
  //         }),
  //         map((response) => response.status === 200 ? response.body : null), // Transforma resposta
  //         catchError((error) => {
  //           console.error('Erro ao carregar paciente', error);
  //           return of(null);
  //         })
  //       );
  //     })
  //   );

  // }




  ngOnDestroy() {
    // Emite um valor para cancelar todas as assinaturas
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }


}
