import { registerLocaleData } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';
import { IdentificacaoUpdatePacienteInterface } from 'src/app/model/documentos/identificacao/indentificacao-update-paciente-interface';
import { IdentificacaoService } from 'src/app/services/api/read/paciente/identificacao/identificacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { UnsubscribeService } from 'src/app/services/system-support/unsubscribes/unsubscribe.service';
import { MascaraService } from 'src/app/services/utilits/forms/mascaras/mascara.service';
import { ValidationFormService } from 'src/app/services/utilits/forms/validation/validation-form.service';
import localePt from '@angular/common/locales/pt';
import { PrimeNGConfig } from 'primeng/api';
import { selectUf } from 'src/app/services/utilits/select-uf';

@Component({
  selector: 'app-identificacao-update',
  templateUrl: './identificacao-update.component.html',
  styleUrls: ['./identificacao-update.component.scss']
})
export class IdentificacaoUpdateComponent implements OnInit {



  protected formValidation: FormGroup;
  protected formSubmitted: boolean = false;
  protected formReset: boolean = false;
  protected selectUfInstance = new selectUf();
  protected formQtdFilhos: boolean = false;
  protected optionUf: { sigla: string, nome: string } [] = [] as { sigla: string, nome: string }[];
  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef;
  private destroy$: Subject<boolean> = new Subject();
  private idadeSubscription: Subscription = new Subscription();




  protected identificacaoUpdateCache: IdentificacaoUpdatePacienteInterface | null = {
      id: 0,
      nomeCompleto: '',
      responsavel: null,
      cpf: '',
      rg: '',
      email: '',
      telefone: '',
      telefoneContato: '',
      nomeDoContato: '',
      idade: 0,
      dataNascimento: '',
      estadoCivil: '',
      filhos: null,
      qtdFilhos: null,
      grauEscolaridade: '',
      profissao: '',
      endereco: {
        id: 0,
        logradouro: '',
        numero: '',
        complemento: null,
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      },
      queixa: {
        id: 0,
        queixa: ''
      }
    } ;

    protected listaUpdatePaciente: IdentificacaoUpdatePacienteInterface = {
      id: 0,
      nomeCompleto: '',
      responsavel: null,
      cpf: '',
      rg: '',
      email: '',
      telefone: '',
      telefoneContato: '',
      nomeDoContato: '',
      idade: 0,
      dataNascimento: '',
      estadoCivil: '',
      filhos: null,
      qtdFilhos: null,
      grauEscolaridade: '',
      profissao: '',
      endereco: {
        id: 0,
        logradouro: '',
        numero: '',
        complemento: null,
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      },
      queixa: {
        id: 0,
        queixa: ''
      }
    }


  constructor(private cacheService: PacienteCacheService, private unsubscribe: UnsubscribeService,
    private identificacaoService: IdentificacaoService, private validationFormService: ValidationFormService,
    private mascaraService: MascaraService, private primengConfig: PrimeNGConfig
  ) {

    this.formValidation = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
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

    this.cacheService.getStatusCaching().pipe(
      takeUntil(this.unsubscribe.unsubscribe)
    ).subscribe((status) => {
      if (status) {
        this.cacheService.getPacienteCache().pipe(
          takeUntil(this.unsubscribe.unsubscribe)
        ).subscribe(
          (dataUpdate => {
            this.identificacaoUpdateCache = dataUpdate;

            console.log(this.identificacaoUpdateCache)


            this.formValidation.patchValue({
              id: this.identificacaoUpdateCache!.id,
              nomeCompleto: this.identificacaoUpdateCache?.nomeCompleto,
              responsavel: this.identificacaoUpdateCache?.responsavel,
              cpf: this.identificacaoUpdateCache?.cpf,
              rg: this.identificacaoUpdateCache?.rg,
              email: this.identificacaoUpdateCache?.email,
              telefone: this.identificacaoUpdateCache?.telefone,
              telefoneContato: this.identificacaoUpdateCache?.telefoneContato,
              nomeDoContato: this.identificacaoUpdateCache?.nomeDoContato,
              idade: this.identificacaoUpdateCache?.idade,
              dataNascimento: new Date(this.identificacaoUpdateCache!.dataNascimento),
              estadoCivil: this.identificacaoUpdateCache?.estadoCivil,
              filhos: this.identificacaoUpdateCache?.filhos,
              qtdFilhos: this.identificacaoUpdateCache?.qtdFilhos,
              grauEscolaridade: this.identificacaoUpdateCache?.grauEscolaridade,
              profissao: this.identificacaoUpdateCache?.profissao,
              cep: this.identificacaoUpdateCache?.endereco.cep,
              logradouro: this.identificacaoUpdateCache?.endereco.logradouro,
              numero: this.identificacaoUpdateCache?.endereco.numero,
              complemento: this.identificacaoUpdateCache?.endereco.complemento,
              bairro: this.identificacaoUpdateCache?.endereco.bairro,
              cidade: this.identificacaoUpdateCache?.endereco.cidade,
              uf: this.identificacaoUpdateCache?.endereco.uf,
              queixa: this.identificacaoUpdateCache?.queixa.queixa



            })
          })
        )
      } else {
        this.carregarPacienteViaAPI();
      }
    })


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


  protected carregarPacienteViaAPI(): void {
    const storageCPF: string | null = localStorage.getItem('cpf');
    this.identificacaoService.carregarPaciente(storageCPF!)
      .pipe(takeUntil(this.unsubscribe.unsubscribe))
      .subscribe(
        (dataUpdate => {
          this.identificacaoUpdateCache = dataUpdate;
          // console.log('Dados para serem atualizados: ', this.identificacaoUpdateCache?.id);

          this.formValidation.patchValue({
            id: this.identificacaoUpdateCache!.id
          })
        })
      );
  }

  protected onClickFocusDataNascimentoLabel() {
    const inputElement = document.querySelector('#data-de-nascimento .p-inputtext') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    } else {
      console.error('Elemento de entrada não encontrado');
    }
  }

  /**
   * Evento de perda de foco do campo dataNascimento, a cada momento de perda de foco
   * o método atualizarIdade analiza o campo se existe valor, se sim o campo
   */
  protected onBlurDataNascimento() {
    this.atualizarIdade();
  }


  protected onInputDataNascimento() {
    this.atualizarIdade();
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


  private loadListUf(): Object[] {
    return this.optionUf = this.selectUfInstance.getUf();
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
  * Evento que lança o valor da idade com base na data de nascimento fornecida
  */
  protected onFocusIdade() {
    const dataNascimento = this.formValidation.get('dataNascimento')?.value;
    // console.log('Data digitada: ', dataNascimento)
    const idade = this.mascaraService.idadeAutomatica(dataNascimento);
    this.formValidation.get('idade')?.setValue(idade);
  }

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

  focusCalendar() {
    // Foca o campo de entrada do p-calendar
    this.calendarInput.nativeElement.focus();
  }



  protected atualizarPaciente(): void {

    this.formSubmitted = true;

    if(this.formValidation.invalid) {
      // console.log(this.formValidation.invalid)
      // console.log('Formulário inválido'); // Para depuração
      return;
    } else {

      this.listaUpdatePaciente = {
        id: this.prontuario,
        nomeCompleto: this.nomeCompleto,
        responsavel: this.responsavel,
        cpf: this.cpf,
        rg: this.rg,
        email: this.email,
        telefone: this.telefone,
        telefoneContato: this.telefoneContato,
        nomeDoContato: this.nomeDoContato,
        idade: this.idade,
        dataNascimento: this.dataNascimento,
        estadoCivil: this.estadoCivil,
        filhos: this.filhos,
        qtdFilhos: this.qtdFilhos,
        grauEscolaridade: this.grauEscolaridade,
        profissao: this.profissao,
        endereco: {
          id: this.prontuario,
          logradouro: this.logradouro,
          numero: this.numero,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
          cep: this.cpf
        },
        queixa: {
          id: this.prontuario,
          queixa: this.queixa
        }
      }

    }

  }


  ngOnDestroy(): void {
    this.cacheService.clearStatusCaching();
    this.destroy$.next(true);
    this.destroy$.complete();
    this.idadeSubscription.unsubscribe();
  }

  get prontuario() {
    return this.formValidation.get('id')?.value;
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


}
