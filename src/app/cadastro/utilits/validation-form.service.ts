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
   * Formatador que após a incersão do campo telefone, atribui um espaço após o
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


}
