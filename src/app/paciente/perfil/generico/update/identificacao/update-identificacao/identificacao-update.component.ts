import { registerLocaleData } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { IdentificacaoUpdatePacienteInterface } from 'src/app/model/documentos/identificacao/indentificacao-update-paciente-interface';
import { IdentificacaoService } from 'src/app/services/api/read/paciente/identificacao/identificacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { UnsubscribeService } from 'src/app/services/system-support/unsubscribes/unsubscribe.service';
import { MascaraService } from 'src/app/services/utilits/forms/mascaras/mascara.service';
import { ValidationFormService } from 'src/app/services/utilits/forms/validation/validation-form.service';
import { PrimeNGConfig } from 'primeng/api';
import { selectUf } from 'src/app/services/utilits/select-uf';
import { MessageService } from 'src/app/services/messagers/message/message.service';
import { UpdateService } from 'src/app/services/api/update/paciente/update.service';
import { Router, RouterLink } from '@angular/router';
import { RedirectService } from 'src/app/redirecting/service-redirect/redirect.service';

import localePt from '@angular/common/locales/pt';
import moment from 'moment';
import { UpdateAlteracaoCpfService } from 'src/app/services/system-support/behavior-subject/paciente/update-alteracao-cpf.service';
import { LoadingDocumentosService } from 'src/app/services/loading/documentos/loading-documentos.service';
declare var $: any;


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
  protected loadingModalCpf: boolean = false;
  protected isEditing: boolean = false;
  protected rgMask = '00.000.000-A'; // Começa com a máscara de 7 dígitos


  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef;

  public updateAlteracaoCpfService: UpdateAlteracaoCpfService;
  public loadingDocumentosService: LoadingDocumentosService;


  private destroy$: Subject<boolean> = new Subject();
  private idadeSubscription: Subscription = new Subscription();
  private valorCpfRestaurado: string = '';
  private valorQtdFilhosRestaurado: number = 0;
  private listaFormOriginal: any[] = [];
  private listaAposBotaoClicado: any[] = [];
  private alteracaoFormulario: boolean = false;
  private roteDePerfil = localStorage.getItem('perfil')?.toLocaleLowerCase();
  private opcaoEditar: boolean = false;





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
      filhos: false,
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
      filhos: false,
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


  constructor(
    private cacheService: PacienteCacheService, private unsubscribe: UnsubscribeService,
    private identificacaoService: IdentificacaoService, private validationFormService: ValidationFormService,
    private mascaraService: MascaraService, private primengConfig: PrimeNGConfig,
    private updatePacienteService: UpdateService, private message: MessageService, private router: Router,
    private updateAlteracaoCpfServiceClass:UpdateAlteracaoCpfService,
    private loadingDocumentosServiceInject: LoadingDocumentosService

  ) {

    this.formValidation = new FormGroup({
      id:               new FormControl({value: null, disabled: true}),
      nomeCompleto:     new FormControl({value: null, disabled: true}, [Validators.required]),
      responsavel:      new FormControl({value: null, disabled: true}, [Validators.required]),
      cpf:              new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoCpf()]),
      rg:               new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoRgFormatado]),
      email:            new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
      telefone:         new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoTelefone()]),
      telefoneContato:  new FormControl({value: null, disabled: true}, [this.validationFormService.validacaoTelefone()]),
      nomeDoContato:    new FormControl({value: null, disabled: true}, [Validators.required]),
      idade:            new FormControl({value: null, disabled: true}),
      dataNascimento:   new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoDataNascimento()]),
      estadoCivil:      new FormControl({value: null, disabled: true}, [Validators.required]),
      filhos:           new FormControl({value: false, disabled: true}),
      qtdFilhos:        new FormControl({value: null, disabled: true}, [this.validationFormService.validacaoQtdFilhos()]),
      grauEscolaridade: new FormControl({value: null, disabled: true}, [Validators.required]),
      profissao:        new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoProfissao()]),
      cep:              new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoCep()]),
      logradouro:       new FormControl({value: null, disabled: true}, [Validators.required]),
      numero:           new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoNumero()]),
      complemento:      new FormControl({value: null, disabled: true}),
      bairro:           new FormControl({value: null, disabled: true}),
      cidade:           new FormControl({value: null, disabled: true}),
      uf:               new FormControl({value: null, disabled: true}),
      queixa:           new FormControl({value: null, disabled: true}, [Validators.required])
    });

    registerLocaleData(localePt);

    this.formValidation.get('dataNascimento')?.valueChanges.pipe(
      takeUntil(this.destroy$)).subscribe();


    const idadeControl = this.formValidation.get('idade');
    if (idadeControl) {
      this.idadeSubscription = idadeControl.valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe();
    }

    this.updateAlteracaoCpfService = this.updateAlteracaoCpfServiceClass;
    this.loadingDocumentosService = this.loadingDocumentosServiceInject;

  }

  ngOnInit(): void {

    this.carregarCachePaciente();
    this.onRgChange();
    this.onResponsavel();
    this.onSelectFilhos();
    this.observeInputCep();
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



  }



  /**
   * O método onRgChange() é responsável por ajustar dinamicamente a máscara e as validações do campo RG com base na
   * quantidade de caracteres inseridos pelo usuário.
   *  Máscara Dinâmica:
   *   Para 7 caracteres: '00.000.00A'.
   *   Para 8 caracteres: '00.000.000-A'.
   *   Para 9 caracteres: '00.000.000-0A'.
   *  Remoção de Caracteres Especiais: O método remove caracteres não numéricos (como . e -), exceto a última letra (se presente).
   * Validação Condicional
   *  Obrigatório: O campo é obrigatório se o RG tiver 7 ou mais caracteres.
   *  Formato Correto: Valida o formato do RG com base no número de caracteres (7, 8 ou 9).
   * Atualização da Validação: Sempre que a máscara ou os validadores são alterados, o método força a revalidação do campo
   * com updateValueAndValidity().
   *
   */
  protected onRgChange(): void {
    this.formValidation.get('rg')?.valueChanges.subscribe(value => {
      let numericValue = value.replace(/\D/g, '');  // Remove caracteres não numéricos

      // Se o último caractere for uma letra, mantenha ela
      if (numericValue.length > 7 && /[A-Za-z]$/.test(value)) {
        numericValue = value.replace(/\D/g, '').slice(0, -1) + value.slice(-1).toUpperCase();  // Mantém a última letra
      }

      // Atualiza a máscara dependendo do comprimento do RG
      if (numericValue.length <= 7) {
        this.rgMask = '00.000.00A';  // Formato para 7 caracteres: 12.345.67-X
      } else if (numericValue.length === 8) {
        this.rgMask = '00.000.000-A';  // Formato para 8 caracteres: 12.345.678-X
      } else if (numericValue.length === 9) {
        this.rgMask = '00.000.000-0A';  // Formato para 9 caracteres: 12.345.678-9X
      }

      // **Reforçar a validação obrigatória e formato**
      if (numericValue.length >= 7) {
        this.formValidation.get('rg')?.setValidators([
          Validators.required,
          this.validationFormService.validacaoRgFormatado
        ]);
      } else {
        // Apenas a validação de formato
        this.formValidation.get('rg')?.setValidators([
          this.validationFormService.validacaoRgFormatado
        ]);
      }

      // Atualiza a validade do campo
      this.formValidation.get('rg')?.updateValueAndValidity();
    });
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
  * Evento que lança o valor da idade com base na data de nascimento fornecida
  */
  protected onFocusIdade() {
    const dataNascimento = this.formValidation.get('dataNascimento')?.value;
    // console.log('Data digitada: ', dataNascimento)
    const idade = this.mascaraService.idadeAutomatica(dataNascimento);
    this.formValidation.get('idade')?.setValue(idade);
  }

  /**
   * Este método verifica se o campo cep está no formado correto do cep sem caracter, se sim ele
   * remaneja o focus do formulário para o campo número.
   */
  protected remanejadorDeFucosCep() {
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



  /*

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


  */


  protected redefinirDados(): void {
    this.carregarCachePaciente();
  }

  protected editar(): void {

    this.isEditing = true;
    this.opcaoEditar = true;

    this.formValidation.get('nomeCompleto')?.enable();

    this.formValidation.get('responsavel')?.enable;

    this.formValidation.get('cpf')?.enable();
    this.formValidation.get('rg')?.enable();
    this.formValidation.get('email')?.enable();
    this.formValidation.get('telefone')?.enable();
    this.formValidation.get('telefoneContato')?.enable();
    this.formValidation.get('nomeDoContato')?.enable();
    this.formValidation.get('dataNascimento')?.enable();
    this.formValidation.get('estadoCivil')?.enable();
    this.formValidation.get('filhos')?.enable();
    this.formValidation.get('qtdFilhos')?.enable();
    this.formValidation.get('grauEscolaridade')?.enable();
    this.formValidation.get('profissao')?.enable();
    this.formValidation.get('cep')?.enable();
    this.formValidation.get('numero')?.enable();
    this.formValidation.get('complemento')?.enable();
    this.formValidation.get('queixa')?.enable();

    const idade = this.formValidation.get('idade')?.value;
    if (idade < 18) {
      this.formValidation.get('responsavel')?.enable();
    }







    this.listaFormOriginal.push(
      this.nomeCompleto,
      this.responsavel,
      this.cpf,
      this.rg,
      this.email,
      this.telefone,
      this.telefoneContato,
      this.nomeDoContato,
      this.idade,
      this.dataNascimento,
      this.estadoCivil,
      this.filhos,
      this.qtdFilhos,
      this.grauEscolaridade,
      this.profissao,
      this.cep,
      this.numero,
      this.complemento,
      this.queixa
    )



  }


  /* Controles do Modal */
  protected openModal(): void {
    $('#modalCpf').modal('show'); // Abre o modal
  }

  protected closeModal(): void {
    this.formValidation.get('cpf')?.setValue(this.valorCpfRestaurado);
    document.getElementById('safeElement')?.focus();
    $('#modalCpf').modal('hide'); // Fecha o modal
  }


  protected focusCalendar() {
    // Foca o campo de entrada do p-calendar
    this.calendarInput.nativeElement.focus();
  }





  protected atualizarEProsseguir(): void {

    this.loadingModalCpf = true;

    setTimeout(() => {

      this.loadingModalCpf = false;
      this.closeModal();
      this.updateAlteracaoCpfService.setBoolean(true);
      this.updatePacienteAPI();

    }, 1500);
  }


























  /**
   * Método criado para facilitar o fluxo e a manutenção dos dados que vem
   * do servidor. A variável 'dateUpdate' realiza a representação de cada
   * valor de dados que o patchValue trás do subscribe.
   * @param dataUpdate valor passado via patchValue
   */
  private carregamentoDePacienteViaPatchValue(dataUpdate: any): void {
    this.identificacaoUpdateCache = dataUpdate;
    // console.log(this.identificacaoUpdateCache)
    this.formValidation.patchValue({
      id:               this.identificacaoUpdateCache!.id,
      nomeCompleto:     this.identificacaoUpdateCache?.nomeCompleto,
      responsavel:      this.identificacaoUpdateCache?.responsavel,
      cpf:              this.identificacaoUpdateCache?.cpf,
      rg:               this.identificacaoUpdateCache?.rg,
      email:            this.identificacaoUpdateCache?.email,
      telefone:         this.identificacaoUpdateCache?.telefone,
      telefoneContato:  this.identificacaoUpdateCache?.telefoneContato,
      nomeDoContato:    this.identificacaoUpdateCache?.nomeDoContato,
      idade:            this.identificacaoUpdateCache?.idade,
      dataNascimento:   moment(this.identificacaoUpdateCache!.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      estadoCivil:      this.identificacaoUpdateCache?.estadoCivil,
      filhos:           this.identificacaoUpdateCache?.filhos ? "true" : "false",
      qtdFilhos:        this.identificacaoUpdateCache?.qtdFilhos,
      grauEscolaridade: this.identificacaoUpdateCache?.grauEscolaridade,
      profissao:        this.identificacaoUpdateCache?.profissao,
      cep:              this.identificacaoUpdateCache?.endereco.cep,
      logradouro:       this.identificacaoUpdateCache?.endereco.logradouro,
      numero:           this.identificacaoUpdateCache?.endereco.numero,
      complemento:      this.identificacaoUpdateCache?.endereco.complemento,
      bairro:           this.identificacaoUpdateCache?.endereco.bairro,
      cidade:           this.identificacaoUpdateCache?.endereco.cidade,
      uf:               this.identificacaoUpdateCache?.endereco.uf,
      queixa:           this.identificacaoUpdateCache?.queixa.queixa
    });

    this.valorCpfRestaurado = this.cpf;
    this.valorQtdFilhosRestaurado = this.qtdFilhos;




  }




  /**
   * Metodo principal da classe e responsável por carregar em cache os dados do paciente
   * selecionado via patchValue.
   */
  private carregarCachePaciente(): void {

    this.cacheService.getStatusCaching()
    .pipe(takeUntil(this.unsubscribe.unsubscribe))
    .subscribe((status) => {
      if (status) {
        this.cacheService.getPacienteCache()
          .pipe(takeUntil(this.unsubscribe.unsubscribe))
          .subscribe(
            (dataUpdate => {
              this.carregamentoDePacienteViaPatchValue(dataUpdate)
            }))
      } else {
        this.carregarPacienteViaAPI();
      }
    })

  }


  /**
   * Este método realiza a chamada direta para a API e retorna os dados do
   * banco de dados caso a função em cache obtenha falha.
   */
  private carregarPacienteViaAPI(): void {
    const storageCPF: string | null = localStorage.getItem('cpf');

    this.identificacaoService.carregarPaciente(storageCPF!)
      .pipe(takeUntil(this.unsubscribe.unsubscribe))
      .subscribe(
        (dataUpdate => {
          this.carregamentoDePacienteViaPatchValue(dataUpdate);
        })
      );
  }








  /**
   * Método que formata o campo data de nascimento para o formato de padrão americano
   * aceitado pelo servidor.
   */
  private atualizarIdade() {
    const dataNascimento = this.formValidation.get('dataNascimento')?.value;

    // Verifica se a dataNascimento é válida antes de processar
    if (dataNascimento) {
        const dataFormatada = this.mascaraService.mascaraDataDeNascimento(dataNascimento);
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
      if (this.opcaoEditar) { // Só entra na lógica se estiver no modo edição
        if (valor < 18) {
          campoResponsavel?.enable();
        } else {
          campoResponsavel?.disable();
          campoResponsavel?.reset()
        }
      }
    })
  }

  private onSelectFilhos(): void {
    this.formValidation.get('filhos')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((valor) => {
      // console.log('Valor do onSelectFilhos: ',valor)

      if(valor === 'true') {
        this.formQtdFilhos = true;
        this.formValidation.get('qtdFilhos')?.setValue(this.valorQtdFilhosRestaurado);
      } else  {
        this.formQtdFilhos = false;
        this.formValidation.get('qtdFilhos')?.reset();
      }
    })
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
      var cepFormatado = valor;

      console.log('Entrada do cep antes da formatação: ',cepFormatado);
      cepFormatado = this.mascaraService.formatarCEP(valor);
      console.log('saida do cep após formatação: ',cepFormatado)


      if(cepFormatado.length === 8) {

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
   *
   * @param statusAlteracaoCpf
   */
  private updatePacienteAPI(): void {
    this.updatePacienteService.updatePatient(this.listaUpdatePaciente)
      .pipe(takeUntil(this.unsubscribe.unsubscribe)).subscribe(
        (data) => {
          if  (data != null && Object.keys(data).length === 0) {
            this.message.setMessage('Ocorreu um erro ao atualizar', 'ALERT_ERROR')
          } else {


            if(this.updateAlteracaoCpfService.getBoolean()) {{
              this.loadingDocumentosService.setBoolean(false);  // finaliza o siclo do loading
              this.router.navigate(['/home/pacientes']);
            }} else {
              this.loadingDocumentosService.setBoolean(false);  // finaliza o siclo do loading
              this.router.navigate([`/paciente/${this.roteDePerfil}/documentos/identificacao`]);
            }


          }
        }
      );
    }







    protected atualizarPaciente(): void {


      this.formSubmitted = true;


      this.listaAposBotaoClicado.push(
        this.nomeCompleto,
        this.responsavel,
        this.cpf,
        this.rg,
        this.email,
        this.telefone,
        this.telefoneContato,
        this.nomeDoContato,
        this.idade,
        this.dataNascimento,
        this.estadoCivil,
        this.filhos,
        this.qtdFilhos,
        this.grauEscolaridade,
        this.profissao,
        this.cep,
        this.numero,
        this.complemento,
        this.queixa
      )


      this.alteracaoFormulario = this.listaFormOriginal.length !== this.listaAposBotaoClicado.length ||
          this.listaFormOriginal.some((valor, index) => valor !== this.listaAposBotaoClicado[index])



      if (this.formValidation.invalid) {
        return;
      } else if (this.alteracaoFormulario) {

        // alert('Valores alterados')

        let qtdFilhos_validado = this.qtdFilhos ?? 0;

        const rgFormatado = this.mascaraService.removerCaracteresEspeciais(this.rg);
        const dataFormatada = this.mascaraService.mascaraDataDeNascimento(this.dataNascimento);
        const nomeCompletoFormatado = this.mascaraService.mascaraFormatoDeTexto(this.nomeCompleto);
        const complementoFormatado = this.mascaraService.mascaraFormatoDeTexto(this.complemento);
        const profissaoFormatado = this.mascaraService.mascaraFormatoDeTexto(this.profissao);

        this.listaUpdatePaciente = {
          id: this.prontuario,
          nomeCompleto: nomeCompletoFormatado,
          responsavel: this.responsavel,
          cpf: this.cpf,
          rg: rgFormatado,
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
          endereco: {
            id: this.prontuario,
            logradouro: this.logradouro,
            numero: this.numero,
            complemento: complementoFormatado,
            bairro: this.bairro,
            cidade: this.cidade,
            uf: this.uf,
            cep: this.cep
          },
          queixa: {
            id: this.prontuario,
            queixa: this.queixa
          }
        };

        console.log("Dados a serem enviados:", this.listaUpdatePaciente);

        if (this.valorCpfRestaurado !== this.cpf) {
          this.openModal();
        } else {
          this.updatePacienteAPI();
        }
      } else {
        // alert('Nenhum valor alterado');
        this.loadingDocumentosService.setBoolean(false);  // finaliza o siclo do loading
        this.router.navigate([`/paciente/${this.roteDePerfil}/documentos/identificacao`]);
        this.message.setMessage("Não houve alteração nos dados cadastrais", "ALERT_INFO");
        this.listaFormOriginal = [];
        this.listaAposBotaoClicado = [];
      }
    }



  ngOnDestroy(): void {
    this.loadingDocumentosService.setRenderizado(false);
    this.cacheService.clearStatusCaching();
    this.destroy$.next(true);
    this.destroy$.complete();
    this.idadeSubscription.unsubscribe();
    this.opcaoEditar = false;
    this.updateAlteracaoCpfService.setBoolean(false);
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


  /**
   * Getter utilizando moment para gerenciar e formatar o valor corretamente
   * vindo do p-calendar ao padrão correto do primeNG. Este padrão é o padrão
   * em que a máscara para formatar a data aguarda para mascará-la para o padrão
   * aceito pelo servidor.
   */
  get dataNascimento() {
    const value = this.formValidation.get('dataNascimento')?.value;
    return moment(value, 'DD/MM/YYYY', true).isValid()
      ? moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY')
      : '';
  }

  /**
   * Setter que ao receber qualquer valor referente a data, lança o valor no input do
   * primeNg em uma formatação esperada pelo p-calendar.
   */
  set dataNascimento(value: string) {
    if (moment(value, 'DD/MM/YYYY', true).isValid()) {
      this.formValidation.get('dataNascimento')?.setValue(moment(value, 'DD/MM/YYYY').toDate());
    }
  }



  get estadoCivil() {
    return this.formValidation.get('estadoCivil')?.value;
  }

  get filhos() {
    return this.formValidation.get('filhos')?.value;

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

  set qtdFilhos(qtd: number) {
    this.qtdFilhos = qtd;
  }

}
