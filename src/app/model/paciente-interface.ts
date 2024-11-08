import { PerfilEnum } from "./perfil-enum";

export interface PacienteInterface {

  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  telefoneParaContato: string;
  idade: string;
  dataDeNascimento: string;
  estadoCivil: string;
  filhos: boolean;
  qtdFilhos: string;
  grauEscolaridade: string;
  profissao: string;
  perfil: PerfilEnum;   /// causa do erro
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  }
  queixa: {
    queixa: string;
  }



}
