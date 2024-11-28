import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  constructor() { }



  /**
   * Método de validação do campo cpf para verificar se a quantidade dos digitos
   * estão de acordo com o padrão do documento
   * @returns Retorna uma função de validação do Angular na interface ValidatorFn.
   * O control representa o controle (input) do formGroup que será validado. O tipo
   * de retorno aceito pode ser um objeto de erros ou nulo. A expressão regular
   * remove todos os caracteres que não existe na sequancia do CPF que não seja de 0-9.
   * A validação só é aceita se o retorno for null.
   */
  public validacaoCpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpfValue = control.value;

      if(cpfValue && cpfValue.replace(/\D/g,'').length === 11) {
        return null;
      }
      return { cpfValido: true}
    };
  }


  /**
   * Método de validação do campo telefone, o número fornecido não pode ser menor
   * ou maior que 11.
   * @returns Retorna uma função de validação do Angular na interface ValidatorFn.
   * O control representa o controle (input) do formGroup que será validado. O tipo
   * de retorno aceito pode ser um objeto de erros ou nulo. A validação só é aceita
   * se o retorno for null.
   */
  public validacaoTelefone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const telValue = control.value;
      if(telValue.length === 11) {
        return null;
      }
      return { telefoneValido: true }
    }
  }

/**
 * Valida o campo input de data de nascimento ao ser invocado no FormControl. A data de
 * nascimento precisa estar no formato dd/mm/yy e os numeros de acordo com a quantidade
 * de dias, mes e ano de acordo com Date do javascript, do contrário a validação não passa.
 * @returns a validação para a lógica retornar o formato correto da data de nascimento.
 */
public validacaoDataNascimento(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    // Verifica se o valor é uma string
    if (!valor || typeof valor !== 'string') {
        return null; // Não valida se o campo está vazio, pois a validação de 'required' deve ser usada
    }

    // Adiciona um log para verificar o valor
    console.log('Valor da data:', valor);

    const partes = valor.split('/');
    if (partes.length !== 3) {
        return { invalidDateFormat: true }; // Formato inválido
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);

    // Verifica se a data é válida
    const data = new Date(ano, mes - 1, dia);
    if (data.getFullYear() !== ano || data.getMonth() + 1 !== mes || data.getDate() !== dia) {
        return { invalidDate: true }; // Data inválida
    }

    return null;
  }
}



public validacaoQtdFilhos(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if(valor === 0 || valor !== null || valor !== undefined) {
      return null;
    } else if(valor < 0){
      return { invalidData: true };
    }

    return null;


  }
}

public validacaoProfissao(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if(valor.length < 4) {
      return  { invalidData: true };;
    } else {
      return null;
    }
  }
}



}
