import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';
import { IdentificacaoUpdatePacienteInterface } from 'src/app/model/documentos/identificacao/indentificacao-update-paciente-interface';
import { IdentificacaoService } from 'src/app/services/api/read/paciente/identificacao/identificacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { UnsubscribeService } from 'src/app/services/system-support/unsubscribes/unsubscribe.service';
import { ValidationFormService } from 'src/app/services/utilits/forms/validation/validation-form.service';

@Component({
  selector: 'app-identificacao-update',
  templateUrl: './identificacao-update.component.html',
  styleUrls: ['./identificacao-update.component.scss']
})
export class IdentificacaoUpdateComponent implements OnInit {



  protected formValidation: FormGroup;
  protected formSubmitted: boolean = false;
  protected formReset: boolean = false;

  identificacaoUpdateCache: IdentificacaoUpdatePacienteInterface | null = {
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


  constructor(private cacheService: PacienteCacheService, private unsubscribe: UnsubscribeService,
    private identificacaoService: IdentificacaoService, private validationFormService: ValidationFormService
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
    })

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

  protected atualizarPaciente(): void {

  }


  ngOnDestroy(): void {
    this.cacheService.clearStatusCaching();
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
