export interface IdentificacaoUpdatePacienteInterface {
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
  dataNascimento: string;
  estadoCivil: string;
  filhos: boolean ;
  qtdFilhos: number | null;
  grauEscolaridade: string;
  profissao: string;
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
    id: number;
    queixa: string;
  }




}
