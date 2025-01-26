import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { TelaHome } from 'src/app/model/home/tela-home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private URLCarregarPacientes: string = 'http://localhost:8080/carregar-tela-home';
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  carregarListaHomePacientes(): Observable<TelaHome[]> {
    return this.http.get<TelaHome[]>(this.URLCarregarPacientes).pipe(
        takeUntil(this.unsubscribe$)
      )
  }


  ngOnDestroy() {
    // Emite um valor para cancelar todas as assinaturas
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
