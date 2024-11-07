import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Paciente } from 'src/app/model/paciente';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  private registarOfPatient: string = 'http://localhost:8080/cadastro/paciente';
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) { }



  registerPatient(patient: Paciente): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.post<any>(this.registarOfPatient, patient)
      .pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (response: HttpResponse<Paciente>) => {
          if(response.status === 200) {
            // aciona o serviço de mensagem e declare
            // Paciente cadastrado com sucesso
            resolve(true)
          }
        }
      })
    })
  }


  ngOnDestroy() {
    // Emite um valor para cancelar todas as assinaturas
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
