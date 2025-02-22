import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascaraService {

  constructor() { }

  /**
   * Esta mascara formata o texto informado, seu objetivo é deixar o texto apresentável e de
   * forma legível, como um nome por exemplo: tendo o nome e sobrenome em letra maiúscula e palavras básicas
   * como 'dos', 'de' 'da' e etc. minusculos deixando-o mais apresentável.
   * @param texto
   * @returns
   */
  public formatarDeTexto(texto: string): string {
    return texto.split(' ').map(word => {
      if (word.length > 3) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    }).join(' ');
  }

  /**
   * Máscara que após a inserção do campo telefone, remove todos os espaços em branco
   * e traços do número de telefone e adiciona um espaço após o segundo dígito.
   */
  public formatarTelefone(value: string): string {
    // console.log('numero recebido: ',value)
    if (value) {
      const numeroLimpo = value.replace(/\s/g, '').replace(/-/g, '');
      const numeroFormatado = numeroLimpo.replace(/(\d{2})(\d{1,})/, '$1 $2');
      // console.log('Numero formatado: ',numeroFormatado )
      return numeroFormatado;
    }
    return value;
  }


  /**
   * Esta mascara verifica a princípio se o valor do parametro é nulo, do contrário
   * é criado um objeto Date recebendo o valor, e outro objeto com a data atual de
   * Date. A lógica funciona em calcula a idade subtraindo o ano de nascimento do ano
   * atual, e, também ajustaa idade se o aniversário ainda não tiver ocorrido este ano.
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


    let idade = dataDeHoje.getFullYear() - dataNascimentoFormulario.getFullYear();
    const mes = dataDeHoje.getMonth() - dataNascimentoFormulario.getMonth();


    if (mes < 0 || (mes === 0 && dataDeHoje.getDate() < dataNascimentoFormulario.getDate())) {
        idade--;
    }

    return idade;
  }

  /**
   * Esta máscara é responsável por transformar o formato da data do estilo português
   * para o estilo inglês: de dd/mm/yy para yyyy-MM-dd para que posse ser salva de
   * acordo com o padrão do servidor. Inicialmente o método transformarTipoDeData
   * detecta se o valor fornecido em parâmetro é uma string, do contrário retorna um erro.
   * Se a condição for false, o valor é uma string, então o método split separa os
   * valores pela barra (/) e armazena em 3 constantes e reorganiza no formato
   * EUA utilizando template string.
   * @param data retorna data formatada no padrão original
   * @returns
   */
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



  formatarCEP(cep: string): string {
    return cep = cep.replace(/\D/g, '');
  }


}
