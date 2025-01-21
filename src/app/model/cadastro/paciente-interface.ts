import { PerfilEnum } from "./perfil-enum";

export interface PacienteInterface {

  nomeCompleto: string;
  responsavel: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  telefoneContato: string;
  nomeDoContato: string;
  idade: string;
  dataNascimento: string;
  estadoCivil: string;
  filhos: boolean;
  qtdFilhos: number;
  grauEscolaridade: string;
  profissao: string;
  perfil: string;   // Necessário ser string para converter o enum para uppercase
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  }
  queixa: {
    queixa: string;
  }



}
