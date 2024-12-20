export interface Paciente {
  prontuario: number,
  nomeCompleto: string,
  cpf: string,
  email: string,
  telefone: string,
  telefoneContato: string,
  idade: number,
  dataNascimento: Date,
  estadoCivil: string,
  filhos: boolean,
  qtdFilhos: number,
  grauEscolaridade: string,
  profissao: string,
  perfil: string,
  endereco: {
    // ... Em definição
  }
}
