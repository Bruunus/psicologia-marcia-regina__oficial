export interface Paciente {

  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  telefoneParaContato: string;
  idade: string;
  dataDeNascimento: string;
  estadoCivil: string;
  filhos: string;
  qtdFilhos: string;
  grauEscolaridade: string;
  profissao: string;
  perfil: string;
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
