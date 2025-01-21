import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteCompartilhamentoService {

  private pacienteCpf: string | undefined;

  setPacienteCpf(cpf: string) {
    this.pacienteCpf = cpf;
  }

  getPacienteCpf(): string | undefined {
    return this.pacienteCpf;
  }


}
