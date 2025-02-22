import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PacienteInterface } from '../model/cadastro/paciente-interface';
import { CreateService } from '../services/api/create/paciente/create.service';
import { PerfilEnum } from '../model/cadastro/perfil-enum';
import { selectUf } from '../services/utilits/select-uf';
import { Router } from '@angular/router';
import { MessageService } from '../services/messagers/message/message.service';
import { ValidationFormService } from '../services/utilits/forms/validation/validation-form.service';
import { PrimeNGConfig } from 'primeng/api';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MascaraService } from '../services/utilits/forms/mascaras/mascara.service';

import { CalculadorDeTelaModoDev } from 'src/calculador-de-tela-modo-dev';


declare var $: any;


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: [
    './cadastro-style-global.component.scss',
    './cadastro-extra-large.component.scss',
    './cadastro-large.component.scss',
    './cadastro-medium.component.scss',
    './cadastro-small.component.scss',
    './cadastro-smartphone.component.scss'
  ]
})
export class CadastroComponent implements OnInit  {

  protected formValidation: FormGroup;
  protected formSubmitted: boolean = false;
  protected formQtdFilhos: boolean = false;
  protected PERFIL!: PerfilEnum;
  protected pacienteCadastro: PacienteInterface = {
    nomeCompleto: '',
    responsavel: '',
    cpf:  '',
    rg: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    idade: '',
    telefoneContato: '',
    nomeDoContato: '',
    estadoCivil:  '',
    filhos:  false,
    qtdFilhos:  0,
    grauEscolaridade:  '',
    profissao:  '',
    perfil: PerfilEnum.PSICOTERAPIA,
    endereco: {
      logradouro:  '',
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

  protected selectUfInstance = new selectUf();
  protected optionUf: { sigla: string, nome: string } [] = [] as { sigla: string, nome: string }[];
  protected ativarLoading: boolean = false;
  protected formReset: boolean = false;  // evita de aparecer msn de erro após o envio

  private destroy$: Subject<boolean> = new Subject();
  private idadeSubscription: Subscription = new Subscription();

  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef; //focus css


  constructor(
    private router: Router,
    private message: MessageService,
    private validationFormService: ValidationFormService,
    private mascaraService: MascaraService,
    private primengConfig: PrimeNGConfig,
    private createService: CreateService,
    protected calculadorDeTelaModoDev: CalculadorDeTelaModoDev  /* Teste responsividade */
  ) {

    this.formValidation = new FormGroup({
      nomeCompleto: new FormControl('', Validators.required),
      responsavel: new FormControl({ value: null, disabled: true}, Validators.required),
      cpf: new FormControl('', [Validators.required, this.validationFormService.validacaoCpf()]),
      rg: new FormControl('', [Validators.required, this.validationFormService.validacaoRG()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required, this.validationFormService.validacaoTelefone()]),
      telefoneContato: new FormControl('', [this.validationFormService.validacaoTelefone()]),
      nomeDoContato: new FormControl('', Validators.required),
      idade: new FormControl({ value: null, disabled: true}),
      dataNascimento: new FormControl('' , [Validators.required, this.validationFormService.validacaoDataNascimento()]),
      estadoCivil: new FormControl('', [Validators.required]),
      filhos: new FormControl(''),
      qtdFilhos: new FormControl({ value: null, disabled: true}, this.validationFormService.validacaoQtdFilhos()),
      grauEscolaridade: new FormControl('', [Validators.required]),
      profissao: new FormControl('', [Validators.required, this.validationFormService.validacaoProfissao()]),
      perfil: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required, this.validationFormService.validacaoCep()]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required, this.validationFormService.validacaoNumero()]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      queixa: new FormControl('', [Validators.required])
    });


    registerLocaleData(localePt);

    this.formValidation.get('dataNascimento')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((valor) => {
      // console.log('Novo valor da data:', valor);
    })


    const idadeControl = this.formValidation.get('idade');
    if (idadeControl) {
      this.idadeSubscription = idadeControl.valueChanges.subscribe((novoValor) => {
        // console.log('Novo valor da idade:', novoValor);
        // Faça o que for necessário com o novo valor da idade aqui
      });
    }
    this.formValidation.get('filhos')?.setValue('nao');
  }



  ngOnInit(): void {

    this.calculadorDeTelaModoDev.atualizarTamanhoTela();  /* Teste responsividade */
    // this.message.setMessage('Testando mensagem','ALERT_SUCCESS')
    // this.message.getMessage()

    this.loadListUf();
    this.primengConfig.setTranslation({
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesShort: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      today: 'Hoje',
      clear: 'Limpar',
    });

    this.onResponsavel();
    this.onSelectFilhos();
    this.observeInputCep();

  }


  //event

  private loadListUf(): Object[] {
    return this.optionUf = this.selectUfInstance.getUf();
  }

  focusCalendar() {
    // Foca o campo de entrada do p-calendar
    this.calendarInput.nativeElement.focus();
  }

  /**
   * Evento de perda de foco do campo dataNascimento, a cada momento de perda de foco
   * o método atualizarIdade analiza o campo se existe valor, se sim o campo
   */
  onBlurDataNascimento() {
      this.atualizarIdade();
  }


  onInputDataNascimento() {
    this.atualizarIdade();
  }

  onClickFocusDataNascimentoLabel() {
    const inputElement = document.querySelector('#data-de-nascimento .p-inputtext') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    } else {
      console.error('Elemento de entrada não encontrado');
    }
  }


  /**
   * Método que formata o campo data de nascimento para o formato de padrão americano
   * aceitado pelo servidor.
   */
  private atualizarIdade() {
    const dataNascimento = this.formValidation.get('dataNascimento')?.value;

    // Verifica se a dataNascimento é válida antes de processar
    if (dataNascimento) {
        const dataFormatada = this.mascaraService.transformarTipoDeData(dataNascimento);
        const idade = this.mascaraService.idadeAutomatica(dataFormatada);
        this.formValidation.get('idade')?.setValue(idade);
    } else {
        // Se a dataNascimento for inválida, você pode definir a idade como vazia ou zero
        this.formValidation.get('idade')?.setValue(null); // ou 0, dependendo da sua lógica
    }
  }


  private onSelectFilhos(): void {
    this.formValidation.get('filhos')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((valor) => {
      // console.log(valor)
      if(valor === 'sim') {
        this.formQtdFilhos = true;
        this.formValidation.get('qtdFilhos')?.enable();
        // console.log(this.formQtdFilhos)
      } else {
        this.formQtdFilhos = false;
        let qtdFilho = this.formValidation.get('qtdFilhos')
        qtdFilho?.disable();
        qtdFilho?.reset('')

        // console.log(this.formQtdFilhos)
      }
    })
  }

  /**
   * Evento responsável por habilitar ou desabilitar o campo responsavel dependendo da idade
   * do paciente.
   */
  private onResponsavel(): void {
    this.formValidation.get('idade')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((valor) => {
      const campoResponsavel = this.formValidation.get('responsavel');
      if (valor < 18) {
        campoResponsavel?.enable();
      } else {
        campoResponsavel?.disable();
      }
    })
  }





  /**
  * Evento que lança o valor da idade com base na data de nascimento fornecida
  */
  onFocusIdade() {
    const dataNascimento = this.formValidation.get('dataNascimento')?.value;
    // console.log('Data digitada: ', dataNascimento)
    const idade = this.mascaraService.idadeAutomatica(dataNascimento);
    this.formValidation.get('idade')?.setValue(idade);
  }




  // metodos

  /**
   * Método que observa as inserções do campo cep, para cada inserção o subscribe formada os dados
   * removendo os caracteres especiais para forma o padrão cep, oito caracteres. Realiza a chamada
   * para API para obter o endereço fornecido pelo cep. Após isso realiza a configuração de focus.
   */
  private observeInputCep() {

    this.formValidation.get('cep')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((valor: string) => {
      const cepFormatado = this.mascaraService.formatarCEP(valor);
      // console.log('saida do cep após formatação: ',cepFormatado)
      if(cepFormatado.length == 8) {

        this.validationFormService.getEnderecoPorCEP(this.cep).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (response) => {
            this.formValidation.patchValue({
              logradouro: response?.logradouro,
              bairro: response?.bairro,
              cidade: response?.localidade,
              uf: response?.uf

            })
            this.remanejadorDeFucosCep();

          }
        })

      }
    })
  }


  /**
   * Este método verifica se o campo cep está no formado correto do cep sem caracter, se sim ele
   * remaneja o focus do formulário para o campo número.
   */
  remanejadorDeFucosCep() {
    const cepControl = this.formValidation.get('cep');
    if (cepControl && cepControl.value.length === 8) {
      // Mover o foco para o próximo input
      const numeroInput = document.querySelector('input[formControlName="numero"]') as HTMLInputElement;

      const validacaoCEP = this.validationFormService.validacaoCep();

      if (validacaoCEP === null) {
        numeroInput.focus();
      } else {
        return;
      }
    }
  }





  /**
   * Método principal que processa os valores do formulário e salva no banco de dados.
   * @returns
   */
  async cadastrar(): Promise<void> {


    this.formSubmitted = true;

    // console.log('Estado do formulário:', this.formValidation);

    if(this.formValidation.invalid) {
      // console.log(this.formValidation.invalid)
      // console.log('Formulário inválido'); // Para depuração
      return;
    } else {
      // console.log('Formulário válido');

      const nomeCompletoFormatado = this.mascaraService.formatarDeTexto(this.nomeCompleto);
      // const celular1Formatado = this.mascaraService.formatarTelefone(this.telefone);
      // const celular2Formatado = this.mascaraService.formatarTelefone(this.telefoneContato);
      const dataFormatada = this.mascaraService.transformarTipoDeData(this.dataNascimento);
      const complementoFormatado = this.mascaraService.formatarDeTexto(this.complemento);
      const profissaoFormatado = this.mascaraService.formatarDeTexto(this.profissao);
      let qtdFilhos_validado;


      if (this.qtdFilhos === null || this.qtdFilhos === undefined) {
        qtdFilhos_validado = 0; // Atribui o valor 0 a this.qtdFilhos se for nulo
      } else {
        qtdFilhos_validado = this.qtdFilhos;
      }



      this.pacienteCadastro = {
        nomeCompleto: nomeCompletoFormatado,
        responsavel: this.responsavel,
        cpf: this.cpf,
        rg: this.rg,
        email: this.email,
        telefone: this.telefone,
        telefoneContato: this.telefoneContato,
        nomeDoContato: this.nomeDoContato,
        idade: this.idade,
        dataNascimento: dataFormatada,
        estadoCivil: this.estadoCivil,
        filhos: this.filhos,
        qtdFilhos: qtdFilhos_validado,
        grauEscolaridade: this.grauEscolaridade,
        profissao: profissaoFormatado,
        perfil: this.perfil,
        endereco: {
          logradouro: this.logradouro,
          numero: this.numero,
          complemento: complementoFormatado,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
          cep: this.cep
        },
        queixa: {
          queixa: this.queixa
        }
      };

      // console.log(this.pacienteCadastro)

      const sendDataAPI = await this.createService.registerPatient(this.pacienteCadastro);

      if (sendDataAPI) {

        this.ativarLoading = true;

        setTimeout(() => {
          this.ativarLoading = false
          this.message.setMessage('Paciente cadastrado com sucesso !!!','ALERT_SUCCESS');
          this.message.getMessage();
        }, 1700); //  tempo para aparecer a mensagem

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

      };

    };
  };


  // validações, mascaras e eventos de validação












  private limparCampos(): void {
    this.formReset = true;
    this.formValidation.get('nomeCompleto')!.setValue('');
    this.formValidation.get('responsavel')!.setValue('');
    this.formValidation.get('cpf')!.setValue('');
    this.formValidation.get('rg')!.setValue('');
    this.formValidation.get('email')!.setValue('');
    this.formValidation.get('telefone')!.setValue('');
    this.formValidation.get('telefoneContato')!.setValue('');
    this.formValidation.get('nomeDoContato')!.setValue('');
    this.formValidation.get('idade')!.setValue('');
    this.formValidation.get('dataNascimento')!.setValue('');
    this.formValidation.get('estadoCivil')!.setValue('');
    this.formValidation.get('filhos')!.setValue('');
    this.formValidation.get('qtdFilhos')!.setValue('');
    this.formValidation.get('grauEscolaridade')!.setValue('');
    this.formValidation.get('profissao')!.setValue('');
    this.formValidation.get('perfil')!.setValue('');
    this.formValidation.get('cep')!.setValue('');
    this.formValidation.get('logradouro')!.setValue('');
    this.formValidation.get('complemento')!.setValue('');
    this.formValidation.get('bairro')!.setValue('');
    this.formValidation.get('cidade')!.setValue('');
    this.formValidation.get('uf')!.setValue('');
    this.formValidation.get('queixa')!.setValue('');
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.idadeSubscription.unsubscribe();
  }


  // getters

  getPerfilEnumKeys(): string[] {
    return Object.values(PerfilEnum);
  }

  get nomeCompleto() {
    return this.formValidation.get('nomeCompleto')?.value;
  }

  get responsavel() {
    return this.formValidation.get('responsavel')?.value;
  }


  get cpf() {
    return this.formValidation.get('cpf')?.value;
  }

  get rg() {
    return this.formValidation.get('rg')?.value;
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

  get nomeDoContato() {
    return this.formValidation.get('nomeDoContato')?.value;
  }


  get idade() {
    return this.formValidation.get('idade')?.value;
  }

  get dataNascimento() {
    return this.formValidation.get('dataNascimento')?.value;
  }

  set dataNascimento(value: string) {
    this.formValidation.get('dataNascimento')?.setValue(value);
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

  get logradouro() {
    return this.formValidation.get('logradouro')?.value;
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

  set qtdFilhos(qtd: number) {
    this.qtdFilhos = qtd;
  }





}
