import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CepFormatter } from 'src/app/model/cadastro/validation/cep-formatter';
import { MessageService } from 'src/app/services/messagers/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  constructor(private http: HttpClient, private message: MessageService) { }



  /**
   * Este validador é chamado em um componente via injeção de dependência.
   * Recebe um parâmetro do tidpo FormGroup (this.formeValidation) e
   * caso a validação dos campos algum estiver inválido ele é acionado
   * e exibe em console o campo que estiver inválido.
   * @param form (this.formValidation)
   * @returns Array com os campos incorretos
   */
  public getInvalidFields(form: FormGroup): string[] {
    const invalidFields: string[] = [];
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control && control.invalid) {
        invalidFields.push(field);
      }
    });
    return invalidFields;
  }



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


  // public validacaoRG(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const cpfValue = control.value;

  //     if(cpfValue && cpfValue.replace(/\D/g,'').length === 9) {
  //       return null;
  //     }
  //     return { rgValido: true}
  //   };
  // }


  // Validador para o formato do RG
  validacaoRgFormatado(control: AbstractControl): ValidationErrors | null {
    const rg = control.value ? control.value : ''; // Mantém o valor original
    const rgLimpo = rg.replace(/[.-]/g, ''); // Remove apenas os caracteres '.' e '-'

    // Verifica o comprimento total, incluindo letras e números
    if (rgLimpo.length === 7 || rgLimpo.length === 8 || rgLimpo.length === 9) {
        return null;  // RG válido
    }
    return { rgInvalido: true };  // RG inválido se não tiver 7, 8 ou 9 caracteres
  }


  // Validador para RG com menos de 7 caracteres
  validacaoRgInvalido(control: AbstractControl): ValidationErrors | null {
    const rg = control.value.replace(/\D/g, ''); // Remove caracteres especiais
    if (rg.length < 7) {
      return { rgInvalido: true }; // RG inválido se tiver menos de 7 caracteres
    }
    return null;
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
    // console.log('Valor da data:', valor);

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



/**
 * Esta validação verifica se o campo de qtdFilho possui a quantidade de caracter necessária para
 * aceitar a inserção. O valor não poder ser nulo, undefined ou com o valor zero, do contrário a
 * validação passa.
 * @returns Retorna a validação do campo de qtdFilhos baseado na presença do preenchimento do campo.
 *
 */
public validacaoQtdFilhosEditarUpdate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if (control.disabled) {
      return null; // Se o campo estiver desabilitado, não valida
    }

    if (valor === null || valor === undefined || isNaN(valor)) {
      return { invalidData: true }; // Garante que o valor não seja nulo ou inválido
    }

    if (valor < 1) {
      return { qtdInvalida: true }; // Se o campo estiver habilitado, não pode ser menor que 1
    }

    return null; // Se passar todas as verificações, está válido
  };
}


/**
 * Esta validação verifica se o campo de profissão possui a quantidade de caracter necessária para
 * aceitar a inserção. A descrição da profissão não pode ser menos que 4 digitos.
 * @returns Retorna a validação do campo de profissao baseado na quantidade de caracter adicionado.
 *
 */
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


/**
 * Esta validação verifica se o campo de cep possui a quantidade de caracter necessária para
 * aceitar a inserção.
 * @returns Retorna a validação do campo de cep baseado na quantidade de caracter adicionado,
 * contanto também com o digito da máscara.
 */
public validacaoCep(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if(valor.length < 8) {
      return  { invalidData: true };;
    } else {
      return null;
    }
  }
}


/**
 * API responsável por buscar o endereço do paciente para popular
 * os campos do formulário. Caso o valor do cep esteja inválido será exibida uma mensagem
 * ao usuário de cep inválido, será lançada uma throw e cairá em catchError do rxjs na qual
 * interpretará a mensagem da throw. O retorno é um observable com valor nulo.
 * @param cep Retorna o CEP buscado pela webservices ViaCep
 * @returns
 */
public getEnderecoPorCEP(cep: string) {
  return this.http.get<CepFormatter>(`https://viacep.com.br/ws/${cep}/json/`).pipe(
    map((response) => {
      // Verifica se a resposta contém um erro      (até a documentação)
      if (response && response.erro) {
        this.message.setMessage('Não foi detectado um CEP validado','ALERT_ALERT');
        // Lança um erro se o CEP for inválido        (até a documentação)
        throw new Error('CEP inválido'); // Lança um erro     (até a documentação)
      }
      // console.log(response);
      return response; // Retorna a resposta válida         (até a documentação)
    }),
    catchError((error) => {
      console.error('Erro ao buscar endereço:', error.message);
      // Retorna um Observable com valor nulo               (até a documentação)
      return of(null); // Retorna um Observable com valor nulo        (até a documentação)
    })
  );
}


/**
 * O campo número para ser validado o seu valor passado é e convertido em string para poder utilizar
 * o metodo startWith para validação. A validação verifica se o valor é uma string ou se inicia com '0'
 * e não é igual a '0'. Essas verificações leva à um resultado inválido, do contrário ela passa.
 */
public validacaoNumero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    // Converte o valor para string
    const valorString = valor !== null ? String(valor) : '';

    // Verifica se o valor é uma string vazia ou se começa com '0' e não é igual a '0'
    if (valorString.length === 0 || (valorString.length > 1 && valorString.startsWith('0'))) {
      return { invalidData: true }; // inválido
    } else {
      return null; // válido
    }
  }
}


public formatterPalavraPrimeiraLetraMaiuscula(str: string): string {
  if (!str) return str; // Verifica se a string não está vazia
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}



}
