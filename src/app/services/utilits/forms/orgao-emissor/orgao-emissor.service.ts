import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrgaoEmissorService {

  /**
   * Retora uma lista de preenchimento de select para trabalhar com campo
   * RG no formulário de cadastro de paciente.
   * @returns Prenchimento dos selects
   */
  getOrgaoEmissor(): { estado: string /*, mascara: string*/ }[] {
    return [
      { estado: 'AC' },
      { estado: 'AL' },
      { estado: 'AP' },
      { estado: 'AM' },
      { estado: 'BA' },
      { estado: 'CE' },
      { estado: 'DF' },
      { estado: 'ES' },
      { estado: 'GO' },
      { estado: 'MA' },
      { estado: 'MT' },
      { estado: 'MS' },
      { estado: 'MG' },
      { estado: 'PB' },
      { estado: 'PR' },
      { estado: 'PE' },
      { estado: 'PI' },
      { estado: 'RJ' },
      { estado: 'RN' },
      { estado: 'RS' },
      { estado: 'RO' },
      { estado: 'RR' },
      { estado: 'SC' },
      { estado: 'SP' },
      { estado: 'SE' },
      { estado: 'TO' }
    ];
  }

}

/*
Após chamar o metodo no componente

rascunho
{ estado: 'AC', mascara: '' },
      { estado: 'AL', mascara: '' },
      { estado: 'AP', mascara: '' },
      { estado: 'AM', mascara: '' },
      { estado: 'BA', mascara: '' },
      { estado: 'CE', mascara: '' },
      { estado: 'DF', mascara: '' },
      { estado: 'ES', mascara: '' },
      { estado: 'GO', mascara: '' },
      { estado: 'MA', mascara: '' },
      { estado: 'MT', mascara: '' },
      { estado: 'MS', mascara: '' },
      { estado: 'MG', mascara: '' },
      { estado: 'PB', mascara: '' },
      { estado: 'PR', mascara: '' },
      { estado: 'PE', mascara: '' },
      { estado: 'PI', mascara: '' },
      { estado: 'RJ', mascara: '' },
      { estado: 'RN', mascara: '' },
      { estado: 'RS', mascara: '' },
      { estado: 'RO', mascara: '' },
      { estado: 'RR', mascara: '' },
      { estado: 'SC', mascara: '' },
      { estado: 'SP', mascara: '' },
      { estado: 'SE', mascara: '' },
      { estado: 'TO', mascara: '' }

*/

