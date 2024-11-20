import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PacienteInterface } from '../model/paciente-interface';
import { CreateService } from '../services/api/create/create.service';
import { PerfilEnum } from '../model/perfil-enum';
import { selectUf } from '../services/utilits/select-uf';
import { Router } from '@angular/router';
import { MessageCadastroPacienteService } from '../services/messagers/info-message/cadastro-paciente/message-cadastro-paciente.service';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';
import { MessageService } from '../services/messagers/message/message.service';
declare var $: any;


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit  {

  formValidation: FormGroup;
  formSubmitted: boolean = false;
  PERFIL!: PerfilEnum;
  pacienteCadastro: PacienteInterface = {
    nomeCompleto: '',
    cpf:  '',
    email: '',
    telefone: '',
    dataNascimento: '',
    idade: '',
    telefoneContato: '',
    estadoCivil:  '',
    filhos:  false,
    qtdFilhos:  '',
    grauEscolaridade:  '',
    profissao:  '',
    perfil: PerfilEnum.PSICOTERAPIA,
    endereco: {
      rua:  '',
      numero:  '',
      complemento:  '',
      bairro:  '',
      cidade:  '',
      uf:  '',
      cep:  ''
    },
    queixa: {
      queixa:  ''
    }
  };

  selectUfInstance = new selectUf();
  optionUf: { sigla: string, nome: string } [] = [] as { sigla: string, nome: string }[];
  protected ativarLoading: boolean = false;
  protected formReset: boolean = false;  // evita de aparecer msn de erro após o envio

  constructor(
    private createService: CreateService,
    private router: Router,
    private message: MessageService, private errorMessage: GerenciadoDeAutenticacaoService
  ) {

    this.formValidation = new FormGroup({
      nomeCompleto: new FormControl('Bruno Fernandes', Validators.required),  // Bruno Fernandes
      cpf: new FormControl('352.785.699-41', [Validators.required, this.validacaoCpf()]),   // 358.498.688-74
      email: new FormControl('brunos@icon.mail', [Validators.required, Validators.email]), // brunus@mail.com
      telefone: new FormControl('11 9 9854-8756'),  // 11 9 9854-8756
      telefoneContato: new FormControl('11 9 9854-8000'), // 11 9 9854-8000
      idade: new FormControl('35'),   //  35
      dataNascimento: new FormControl('1977-05-22'),  // 1977-05-22
      estadoCivil: new FormControl('Casado'), // Casado
      filhos: new FormControl(''),
      qtdFilhos: new FormControl('0', [Validators.min(0)]),  //
      grauEscolaridade: new FormControl('Ensino_Superior Completo'),  //  Ensino_Superior Completo
      profissao: new FormControl('Desenvolvedor'), // Desenvolvedor
      perfil: new FormControl('PSICOLOGIA', /*Validators.required*/), // PSICOLOGIA
      cep: new FormControl('05468-857'),   //  05468-857
      rua: new FormControl('Das Flores'),   //  Das Flores
      numero: new FormControl('105'),  // 105
      complemento: new FormControl('Apartamento  10'), // Apartamento  10
      bairro: new FormControl('Parque_Guarano'),  // Parque_Guarano
      cidade: new FormControl('São Paulo'),    // São Paulo
      uf: new FormControl('SP'),  // SP
      queixa: new FormControl('Loren ..') // Loren ..
    });

    this.formValidation.get('filhos')?.setValue('nao');
  }



  ngOnInit(): void {
    this.loadListUf()
  }


  //event

  private loadListUf(): Object[] {
    return this.optionUf = this.selectUfInstance.getUf();
  }



  async cadastrar(): Promise<void> {

    this.formSubmitted = true;

    console.log('Estado do formulário:', this.formValidation);

    if(this.formValidation.invalid) {
      console.log(this.formValidation.invalid)
      console.log('Formulário inválido'); // Para depuração
      return;
    } else {
      console.log('Formulário válido');


      this.pacienteCadastro = {
        nomeCompleto: this.nomeCompleto,
        cpf: this.cpf,
        email: this.email,
        telefone: this.telefone,
        telefoneContato: this.telefoneContato,
        idade: this.idade,
        dataNascimento: this.dataNascimento,
        estadoCivil: this.estadoCivil,
        filhos: this.filhos,
        qtdFilhos: this.qtdFilhos,
        grauEscolaridade: this.grauEscolaridade,
        profissao: this.profissao,
        perfil: this.perfil,
        endereco: {
          rua: this.rua,
          numero: this.numero,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
          cep: this.cep
        },
        queixa: {
          queixa: this.queixa
        }
      }

      // const sendDataAPI = await this.createService.registerPatient(this.pacienteCadastro);

      if (true/*sendDataAPI*/) {

        this.ativarLoading = true;

        setTimeout(() => {
          this.ativarLoading = false
          this.message.setMessage('Paciente cadastrado com sucesso !!!','ALERT_SUCCESS');
          this.message.getMessage();
        }, 2100); //  tempo para aparecer a mensagem

        setTimeout(() => {
          this.limparCampos();
        }, 1310); // tempo para limpar os campos


        // Mecanismo de atraso de redirecionamento com o componente RedirectComponent
        setTimeout(() => {

          setTimeout(() => {
            window.location.reload();
          }, 100);

          this.router.navigate(['redirect-home']);
        }, 3500); //   tempo de redirecionamento

      } else {
        this.ativarLoading = false;
      }

    }
  }


  // validações, mascaras e eventos de validação

  protected onCpf(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorFiltrado = input.value.replace(/\D/g,'');
    this.formValidation.get('cpf')?.setValue(valorFiltrado);
    console.log('Valor filtrado do cpf:' , this.cpf)
  }


  /**
   * Método de validação do campo cpf para verificar se a quantidade dos digitos
   * estão de acordo com o padrão do documento
   * @returns Retorna uma função de validação do Angular na interfaco ValidatorFn.
   * O control representa o controle (input) do formGroup que será validado. O tipo
   * de retorno aceito pode ser um objeto de erros ou nulo. A expressão regular
   * remove todos os caracteres que não existe na sequancia do CPF que não seja de 0-9.
   */
  protected validacaoCpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpfValue = control.value;

      if(cpfValue && cpfValue.replace(/\D/g,'').length === 11) {
        return null;
      }
      return { cpfValido: true}
    };
  }



  private limparCampos(): void {
    this.formReset = true;
    this.formValidation.get('nomeCompleto')!.setValue('');
    this.formValidation.get('cpf')!.setValue('');
    this.formValidation.get('email')!.setValue('');
    this.formValidation.get('telefone')!.setValue('');
    this.formValidation.get('telefoneContato')!.setValue('');
    this.formValidation.get('idade')!.setValue('');
    this.formValidation.get('dataNascimento')!.setValue('');
    this.formValidation.get('estadoCivil')!.setValue('');
    this.formValidation.get('filhos')!.setValue('');
    this.formValidation.get('qtdFilhos')!.setValue('');
    this.formValidation.get('grauEscolaridade')!.setValue('');
    this.formValidation.get('profissao')!.setValue('');
    this.formValidation.get('perfil')!.setValue('');
    this.formValidation.get('cep')!.setValue('');
    this.formValidation.get('rua')!.setValue('');
    this.formValidation.get('numero')!.setValue('');
    this.formValidation.get('complemento')!.setValue('');
    this.formValidation.get('bairro')!.setValue('');
    this.formValidation.get('cidade')!.setValue('');
    this.formValidation.get('uf')!.setValue('');
    this.formValidation.get('queixa')!.setValue('');
  }



  getPerfilEnumKeys(): string[] {
    return Object.values(PerfilEnum);
  }

  get nomeCompleto() {
    return this.formValidation.get('nomeCompleto')?.value;
  }

  get cpf() {
    return this.formValidation.get('cpf')?.value;
  }

  get email() {
    return this.formValidation.get('email')?.value;
  }

  get telefone() {
    return this.formValidation.get('telefone')?.value;
  }

  get telefoneContato() {
    return this.formValidation.get('telefoneContato')?.value;
  }

  get idade() {
    return this.formValidation.get('idade')?.value;
  }

  get dataNascimento() {
    return this.formValidation.get('dataNascimento')?.value;
  }

  get estadoCivil() {
    return this.formValidation.get('estadoCivil')?.value;
  }

  get filhos() {
    const value = this.formValidation.get('filhos')?.value;
    return value === 'sim'; // Retorna true se o valor for "sim", caso contrário, retorna false
  }

  get qtdFilhos() {
    return this.formValidation.get('qtdFilhos')?.value;
  }

  get grauEscolaridade() {
    return this.formValidation.get('grauEscolaridade')?.value;
  }

  get profissao() {
    return this.formValidation.get('profissao')?.value;
  }

  get perfil() {
    const perfilUpperCase: string = this.formValidation.get('perfil')?.value;
    return perfilUpperCase.toUpperCase()
  }

  get cep() {
    return this.formValidation.get('cep')?.value;
  }

  get rua() {
    return this.formValidation.get('rua')?.value;
  }

  get numero() {
    return this.formValidation.get('numero')?.value;
  }

  get complemento() {
    return this.formValidation.get('complemento')?.value;
  }

  get bairro() {
    return this.formValidation.get('bairro')?.value;
  }

  get cidade() {
    return this.formValidation.get('cidade')?.value;
  }

  get uf() {
    return this.formValidation.get('uf')?.value;
  }

  get queixa() {
    return this.formValidation.get('queixa')?.value;
  }







}
