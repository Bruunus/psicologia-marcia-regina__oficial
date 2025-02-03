import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { TelaHome } from 'src/app/model/home/tela-home';
import { UrlService } from 'src/app/services/url-service/url.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  carregarListaHomePacientes(): Observable<TelaHome[]> {
    return this.http.get<TelaHome[]>(this.urlService.urlCarregarPacienteTelaHome).pipe(
        takeUntil(this.unsubscribe$)
      )
  }


  ngOnDestroy() {
    // Emite um valor para cancelar todas as assinaturas
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
