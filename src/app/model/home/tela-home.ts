export interface TelaHome {
  dataUltimoAtendimento: Date | null,
  nomeCompleto: string,
  perfil: string,
  pacienteId: number,
  cpf: string,
  [key: string]: any;   // Permite que a interface aceite outras propriedades dinâmicas, útil para ordenação. ordenação da tabela home
}
