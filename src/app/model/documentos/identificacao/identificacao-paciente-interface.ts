export interface IdentificacaoPacienteInterface {
  id: number;
  nomeCompleto: string;
  responsavel: string | null;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  telefoneContato: string;
  nomeDoContato: string;
  idade: number;
  dataNascimento: Date;
  estadoCivil: string;
  filhos: boolean | null;
  qtdFilhos: number | null;
  grauEscolaridade: string;
  profissao: string;
  statusPaciente: string;
  perfil: string;
  endereco: {
    id: number,
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  queixa: {
    queixa: string;
  }




}
