import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PacienteInterface } from '../model/paciente-interface';
import { CreateService } from '../services/api/create/create.service';
import { PerfilEnum } from '../model/perfil-enum';
import { selectUf } from '../services/utilits/select-uf';
declare var $: any;


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit  {

  formValidation: FormGroup;
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

  constructor(private createService: CreateService) {
    this.formValidation = new FormGroup({
      nomeCompleto: new FormControl('', Validators.maxLength(45)),
      cpf: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      telefoneContato: new FormControl(''),
      idade: new FormControl(''),
      dataNascimento: new FormControl(''),
      estadoCivil: new FormControl(''),
      filhos: new FormControl('nao'),
      qtdFilhos: new FormControl('', [Validators.min(0)]),
      grauEscolaridade: new FormControl(''),
      profissao: new FormControl(''),
      perfil: new FormControl('', Validators.required),
      cep: new FormControl(''),
      rua: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      uf: new FormControl(''),
      queixa: new FormControl('')
    });
  }



  ngOnInit(): void {
    this.loadListUf()
  }


  //event

  private loadListUf(): Object[] {
    return this.optionUf = this.selectUfInstance.getUf();
  }



  cadastrar(): void {

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

      //chama a api para cadastrar no banco



    }

    this.createService.registerPatient(this.pacienteCadastro)

    console.log(this.pacienteCadastro)



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
