import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascaraService {

  constructor() { }

  /**
   * Máscara que após a incersão do campo telefone, atribui um espaço após o
   * segundo caracter para legibilidade no banco de dados.
   */
  public formatarTelefone(value: string): string {
    console.log('numero recebido: ',value)
    if (value) {
      // Remover todos os espaços em branco e traços do número de telefone
      const numeroLimpo = value.replace(/\s/g, '').replace(/-/g, '');
      // Adicionar um espaço após o segundo dígito
      const numeroFormatado = numeroLimpo.replace(/(\d{2})(\d{1,})/, '$1 $2');

      console.log('Numero formatado: ',numeroFormatado )
      return numeroFormatado;
    }
    return value;
  }


  /**
   * Máscara que recebe um formato de data do prime ng como dd/mm/yy e é transformada no formato de
   * yyyy-MM-dd padrão exigido pelo servidor.
   *
   * @param dataNascimento string da data que será recebica pelo invocador
   * @returns
   */
  idadeAutomatica(dataNascimento: string): number | null {
    if (!dataNascimento) {
        return null;
    }

    const dataNascimentoFormulario = new Date(dataNascimento);
    const dataDeHoje = new Date();

    // Calcula a idade subtraindo o ano de nascimento do ano atual
    let idade = dataDeHoje.getFullYear() - dataNascimentoFormulario.getFullYear();
    const mes = dataDeHoje.getMonth() - dataNascimentoFormulario.getMonth();

    // Ajusta a idade se o aniversário ainda não tiver ocorrido este ano
    if (mes < 0 || (mes === 0 && dataDeHoje.getDate() < dataNascimentoFormulario.getDate())) {
        idade--;
    }

    return idade;
  }

  transformarTipoDeData(data: string): string {



    if (typeof data !== 'string') {
      console.error('O valor passado para transformarTipoDeData não é uma string:', data);
      return ''; // Retorne uma string vazia ou trate o erro conforme necessário
    }

    const partes = data.split('/');

    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];


    const dataFormatada = `${ano}-${mes}-${dia}`;

    // console.log('Data formatada: ', dataFormatada)

    return dataFormatada;
  }



  mascaraDataNascimento(data: string): string {

    // Remove caracteres que não são dígitos
    data = data.replace(/\D/g, '');

    // Adiciona a máscara
    if (data.length >= 2) {
      data = data.replace(/(\d{2})(\d)/, '$1/$2');
    }
    if (data.length >= 5) {
      data = data.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    return data;
  }


}
