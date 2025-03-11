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
import { Router } from '@angular/router';

import localePt from '@angular/common/locales/pt';
import { DateTime } from 'luxon';
import { UpdateAlteracaoCpfService } from 'src/app/services/system-support/behavior-subject/paciente/update-alteracao-cpf.service';
import { LoadingDocumentosService } from 'src/app/services/loading/documentos/loading-documentos.service';
import { OrgaoEmissorService } from 'src/app/services/utilits/forms/orgao-emissor/orgao-emissor.service';
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
  protected optionOrgaoEmissor: { estado: string } [] = [] as { estado: string} [];
  protected loadingModalCpf: boolean = false;
  protected isEditing: boolean = false;
  protected orgaoEmissorSelecionado: string = '';
  protected rgMask = '00.000.000-A'; // Começa com a máscara de 7 dígitos



  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef;

  public updateAlteracaoCpfService: UpdateAlteracaoCpfService;
  public loadingDocumentosService: LoadingDocumentosService;


  private destroy$: Subject<boolean> = new Subject();
  private idadeSubscription: Subscription = new Subscription();
  private valorCpfRestaurado: string = '';
  private valorQtdFilhosRestaurado: number = 0;
  private listaDoCache: any[] = [];
  private listaAposBotaoClicado: any[] = [];
  private alteracaoFormulario: boolean = false;
  private roteDePerfil = localStorage.getItem('perfil')?.toLocaleLowerCase();
  private opcaoEditar: boolean = false;
  private modoEdicao: boolean = false;
  private _rg: string = ''; // é uma variável privada usada para evitar loop infinito.




  protected identificacaoUpdateCache: IdentificacaoUpdatePacienteInterface | null = {
      id: 0,
      nomeCompleto: '',
      responsavel: null,
      cpf: '',
      rg: '',
      orgaoSsp: '',
      email: '',
      telefone: '',
      telefoneContato: '',
      nomeDoContato: '',
      idade: 0,
      dataNascimento: '',
      estadoCivil: '',
      filhos: false,
      qtdFilhos: 0,
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
      orgaoSsp: '',
      email: '',
      telefone: '',
      telefoneContato: '',
      nomeDoContato: '',
      idade: 0,
      dataNascimento: '',
      estadoCivil: '',
      filhos: false,
      qtdFilhos: 0,
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
    private loadingDocumentosServiceInject: LoadingDocumentosService,
    private orgaoEmissorService: OrgaoEmissorService

  ) {

    this.formValidation = new FormGroup({
      id:               new FormControl({value: null, disabled: true}),
      nomeCompleto:     new FormControl({value: null, disabled: true}, [Validators.required]),
      responsavel:      new FormControl({value: null, disabled: true}, [Validators.required]),
      cpf:              new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoCpf()]),
      rg:               new FormControl({value: null, disabled: true}, [Validators.required]),
      orgaoSsp:         new FormControl({value: null, disabled: true}, [Validators.required]),
      email:            new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
      telefone:         new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoTelefone()]),
      telefoneContato:  new FormControl({value: null, disabled: true}, [this.validationFormService.validacaoTelefone()]),
      nomeDoContato:    new FormControl({value: null, disabled: true}, [Validators.required]),
      idade:            new FormControl({value: null, disabled: true}),
      dataNascimento:   new FormControl({value: null, disabled: true}, [Validators.required, this.validationFormService.validacaoDataNascimento()]),
      estadoCivil:      new FormControl({value: null, disabled: true}, [Validators.required]),
      filhos:           new FormControl({value: false, disabled: true}),
      qtdFilhos:        new FormControl({value: 0, disabled: true}, [this.validationFormService.validacaoQtdFilhosEditarUpdate()]),
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




    this.onResponsavel();
    this.onSelectFilhos();
    this.observeInputCep();
    this.loadListUf();
    this.loadListOrgaoEmissor();

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

    // this.formValidation.get('filhos')?.disable();

    // if(!filhos) {
          // this.formValidation.get('qtdFilhos')?.enable();
    // }


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

  // private formatadorRGNgxMask(rg: string | undefined): string {
  //   if (!rg) return ''; // Evita processar valores indefinidos

  //   const orgaoEmissor = this.orgaoEmissorService.getOrgaoEmissor();
  //   const sspEncontrado = orgaoEmissor.find(ssp => ssp.estado === this.orgaoSsp);

  //   if (sspEncontrado) {
  //     this.rgMask = this.mascaraService.mascaraRg(this.orgaoSsp);
  //   }

  //   return this.rgMask ; // Retorna a máscara aplicada ou o próprio valor
  // }

  private formatadorRGNgxMask(rg: string | undefined, estado: string): string {
    if (!rg) return '';

    const rgMask = this.mascaraService.mascaraRg(estado);
    return this.aplicarMascara(rg, rgMask);
  }

  private aplicarMascara(valor: string, mascara: string): string {
    let resultado = '';
    let posicaoValor = 0;

    for (let i = 0; i < mascara.length; i++) {
      if (mascara[i] === '0' || mascara[i] === 'A') {
        if (posicaoValor < valor.length) {
          resultado += valor[posicaoValor];
          posicaoValor++;
        } else {
          break;
        }
      } else {
        resultado += mascara[i];
      }
    }

    return resultado;
  }



  protected redefinirDados(): void {
    this.carregarCachePaciente();
  }













  protected editar(): void {

    this.modoEdicao = true;

    this.isEditing = true;
    this.opcaoEditar = true;

    const idade = this.formValidation.get('idade')?.value;
    const filhos = this.formValidation.get('filhos')?.value;
    const qtdFilhos = this.formValidation.get('qtdFilhos');

    this.formValidation.get('nomeCompleto')?.enable();

    this.formValidation.get('responsavel')?.enable;

    this.formValidation.get('cpf')?.enable();
    this.formValidation.get('rg')?.enable();
    this.formValidation.get('orgaoSsp')?.enable();
    this.formValidation.get('email')?.enable();
    this.formValidation.get('telefone')?.enable();
    this.formValidation.get('telefoneContato')?.enable();
    this.formValidation.get('nomeDoContato')?.enable();
    this.formValidation.get('dataNascimento')?.enable();
    this.formValidation.get('estadoCivil')?.enable();
    this.formValidation.get('filhos')?.enable();




    // Em modo de edição se o valor de filhos for true o campo é habilitado
    // Do contrário fica desabilitado (ver onSelectfilhos)
    if (filhos === 'true') {
      qtdFilhos?.enable();
    } else {
      qtdFilhos?.disable();
    }






    this.formValidation.get('grauEscolaridade')?.enable();
    this.formValidation.get('profissao')?.enable();
    this.formValidation.get('cep')?.enable();
    this.formValidation.get('numero')?.enable();
    this.formValidation.get('complemento')?.enable();
    this.formValidation.get('queixa')?.enable();


    if (idade < 18) {
      this.formValidation.get('responsavel')?.enable();
    }

    this.listaDoCache.push(
      this.nomeCompleto,
      this.responsavel,
      this.cpf,
      this.rg,
      this.orgaoSsp,
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
      orgaoSsp:         this.identificacaoUpdateCache?.orgaoSsp,
      email:            this.identificacaoUpdateCache?.email,
      telefone:         this.identificacaoUpdateCache?.telefone,
      telefoneContato:  this.identificacaoUpdateCache?.telefoneContato,
      nomeDoContato:    this.identificacaoUpdateCache?.nomeDoContato,
      idade:            this.identificacaoUpdateCache?.idade,
      dataNascimento: DateTime.fromFormat(this.identificacaoUpdateCache!.dataNascimento, 'yyyy-MM-dd').toFormat('dd/MM/yyyy'),
      estadoCivil:      this.mascaraService.mascaraFormatoDeTexto(this.identificacaoUpdateCache?.estadoCivil),
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

    this.rg = this.formatadorRGNgxMask(this.rg, this.orgaoSsp);







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

  private loadListOrgaoEmissor(): Object[] {
    return this.optionOrgaoEmissor = this.orgaoEmissorService.getOrgaoEmissor();
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

























  /**
   * O evento para o campo select Filhos realiza modificações no campo de qtdFilhos
   * dependendo do seu valor de estato atual. Se a variável 'modoEdicao' iniciada em 'false'
   * continuar 'false' na renderização significa que o modo de edição não foi acionado então
   * este evento é rejeitado, esse é um método para lidar com o valro inicial na renderização
   * da tela ao carregar o formulário pois, o valueChanges é executado na renderização.
   *
   * Em caso de edição o fluxo cai no segundo if habilitando o campo normalmente, e se caso o valor
   * seja 0 é alterado para 1 obrigatóriamente
   */
  private onSelectFilhos(): void {
    const filhos = this.formValidation.get('filhos');
    const qtdFilhos = this.formValidation.get('qtdFilhos');

    filhos?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((valor) => {

      if (!this.modoEdicao) {
        return; // Se não estiver no modo de edição, não faz nada
      }

      if (valor === 'true') {
        this.formQtdFilhos = true;

        qtdFilhos?.enable();

        // Se for nulo ou 0, seta para 1
        if (!qtdFilhos?.value || qtdFilhos.value === 0) {
          qtdFilhos?.setValue(1, { emitEvent: false });
        }
      } else {
        this.formQtdFilhos = false;
        qtdFilhos?.setValue(0, { emitEvent: false });
        qtdFilhos?.disable();
      }
    });
  }




  /**
   * Este método adiciona a mascara respectiva ao órgão emissor do estado
   * @param orgaoEmissor enviado direto do select do formulário html
   */
  protected onOrgaoEmissor(orgaoEmissor: string): void {
    this.orgaoEmissorSelecionado = orgaoEmissor;
    this.rgMask = this.mascaraService.mascaraRg(orgaoEmissor);
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

      // console.log('Entrada do cep antes da formatação: ',cepFormatado);
      cepFormatado = this.mascaraService.formatarCEP(valor);
      // console.log('saida do cep após formatação: ',cepFormatado)


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
        this.orgaoSsp,
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


      // faz uma comparação com a lista do cache com a lista editada, para detectar alteração
      this.alteracaoFormulario =
        this.listaDoCache.length !== this.listaAposBotaoClicado.length ||
        this.listaDoCache.some((valor, index) =>
            valor !== this.listaAposBotaoClicado[index])


        console.log('Lista do cache', this.listaDoCache)
        console.log('Lista após clicar no button: ', this.listaAposBotaoClicado)


      if (this.formValidation.invalid) {

        console.error('Envio inválido', this.formValidation.errors)
        console.log('Campos inválidos:', this.validationFormService.getInvalidFields(this.formValidation));



        return;
      } else if (this.alteracaoFormulario) {







    console.log('Status de alteração: ', this.alteracaoFormulario)



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
          orgaoSsp: this.orgaoSsp,
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


        console.log('Status de alteração: ', this.alteracaoFormulario)

        // alert('Nenhum valor alterado');
        this.loadingDocumentosService.setBoolean(false);  // finaliza o siclo do loading
        this.router.navigate([`/paciente/${this.roteDePerfil}/documentos/identificacao`]);
        this.message.setMessage("Não houve alteração nos dados cadastrais", "ALERT_INFO");
        this.listaDoCache = [];
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

  get rg(): string {
    return this.formValidation.get('rg')?.value || this._rg;
  }

  set rg(value: string) {
    this._rg = value; // Armazena o valor internamente para evitar loop
    this.formValidation.get('rg')?.setValue(value, { emitEvent: false }); // Atualiza o FormControl sem disparar eventos
  }


  get orgaoSsp() {
    return this.formValidation.get('orgaoSsp')?.value;
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
    return DateTime.fromFormat(value, 'dd/MM/yyyy').isValid
      ? DateTime.fromFormat(value, 'dd/MM/yyyy').toFormat('dd/MM/yyyy')
      : '';
  }

  /**
   * Setter que ao receber qualquer valor referente a data, lança o valor no input do
   * primeNg em uma formatação esperada pelo p-calendar.
   */
  set dataNascimento(value: string) {
    if (DateTime.fromFormat(value, 'dd/MM/yyyy').isValid) {
      this.formValidation.get('dataNascimento')?.setValue(DateTime.fromFormat(value, 'dd/MM/yyyy').toJSDate());
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
