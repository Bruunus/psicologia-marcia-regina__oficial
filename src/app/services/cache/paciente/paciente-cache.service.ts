import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteCacheService {
  private pacienteSubject = new BehaviorSubject<IdentificacaoPacienteInterface | null>(this.getPacienteFromStorage());

  constructor() {}

  // 🔹 1️⃣ Define um paciente no cache e salva no localStorage
  setPacienteCache(paciente: IdentificacaoPacienteInterface): void {
    localStorage.setItem('paciente', JSON.stringify(paciente)); // Persiste os dados
    this.pacienteSubject.next(paciente);
  }

  // 🔹 2️⃣ Obtém um Observable para o paciente armazenado
  getPacienteCache() {
    return this.pacienteSubject.asObservable();
  }

  // 🔹 3️⃣ Obtém o paciente diretamente do localStorage
  private getPacienteFromStorage(): IdentificacaoPacienteInterface | null {
    const storedPaciente = localStorage.getItem('paciente');
    return storedPaciente ? JSON.parse(storedPaciente) : null;
  }

  // 🔹 4️⃣ Limpa o paciente do cache e do localStorage
  clearCachePaciente(): void {
    localStorage.removeItem('paciente');
    // this.pacienteSubject.next(null);
    this.pacienteSubject.complete();
    this.pacienteSubject = new BehaviorSubject<IdentificacaoPacienteInterface | null>(null);
  }
}
