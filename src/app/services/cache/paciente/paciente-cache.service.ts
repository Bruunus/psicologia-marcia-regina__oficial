import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';
import { IdentificacaoUpdatePacienteInterface } from 'src/app/model/documentos/identificacao/indentificacao-update-paciente-interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteCacheService {
  private pacienteSubject = new BehaviorSubject<IdentificacaoUpdatePacienteInterface | null>(this.getPacienteFromStorage());
  private statusCaching = new BehaviorSubject<boolean>(false);
  public statusCachingObservable$ = this.statusCaching.asObservable();  // ouvidor do setStatusCaching()

  constructor() {}

  // 🔹 1️⃣ Define um paciente no cache e salva no localStorage
  setPacienteCache(paciente: IdentificacaoUpdatePacienteInterface): void {
    localStorage.setItem('paciente', JSON.stringify(paciente)); // Persiste os dados
    this.pacienteSubject.next(paciente);
  }

  // 🔹 2️⃣ Obtém um Observable para o paciente armazenado
  getPacienteCache() {
    return this.pacienteSubject.asObservable();
  }

  // 🔹 3️⃣ Obtém o paciente diretamente do localStorage
  private getPacienteFromStorage(): IdentificacaoUpdatePacienteInterface | null {
    const storedPaciente = localStorage.getItem('paciente');
    return storedPaciente ? JSON.parse(storedPaciente) : null;
  }

  // 🔹 4️⃣ Limpa o paciente do cache e do localStorage
  clearCachePaciente(): void {
    localStorage.removeItem('paciente');
    // this.pacienteSubject.next(null);
    this.pacienteSubject.complete();
    this.pacienteSubject = new BehaviorSubject<IdentificacaoUpdatePacienteInterface | null>(null);
  }


  // altera o comportamento da variável para poder poder transitar entre aa api e a chamada getPacienteCache
  setStatusCaching(status: boolean) {
    this.statusCaching.next(status);
  }
  getStatusCaching() {
    return this.statusCaching.asObservable();
  }

  clearStatusCaching() {
    this.statusCaching.complete();
    this.statusCaching = new BehaviorSubject<boolean>(false);

  }

}
