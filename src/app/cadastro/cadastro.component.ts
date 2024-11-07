import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Estados } from '../model/estados';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../model/paciente';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit  {

  formValidation: FormGroup;
  pacienteCadastro: Paciente = {
    nomeCompleto: '',
    cpf:  '',
    email:  '',
    telefone:  '',
    telefoneParaContato:  '',
    idade: '',
    dataDeNascimento:  '',
    estadoCivil:  '',
    filhos:  '',
    qtdFilhos:  '',
    grauEscolaridade:  '',
    profissao:  '',
    perfil:  '',
    endereco: {
      rua:  '',
      numero:  '',
      complemento:  '',
      bairro:  '',
      cidade:  '',
      estado:  '',
      cep:  ''
    },
    queixa: {
      queixa:  ''
    }


  };

  constructor() {
    this.formValidation = new FormGroup({
      nomeCompleto: new FormControl('', Validators.maxLength(45)),
      cpf: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      telefoneParaContato: new FormControl(''),
      idade: new FormControl(''),
      dataDeNascimento: new FormControl(''),
      estadoCivil: new FormControl(''),
      filhos: new FormControl(''),
      qtdFilhos: new FormControl(''),
      grauEscolaridade: new FormControl(''),
      profissao: new FormControl(''),
      perfil: new FormControl(''),
      cep: new FormControl(''),
      rua: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      queixa: new FormControl('')
    });
  }

  estados: Estados[] = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ]

  ngOnInit(): void {

  }

  cadastrar(): void {

    this.pacienteCadastro = {
      nomeCompleto: this.nomeCompleto,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
      telefoneParaContato: this.telefoneParaContato,
      idade: this.idade,
      dataDeNascimento: this.dataDeNascimento,
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
        estado: this.estado,
        cep: this.cep
      },
      queixa: {
        queixa: this.queixa
      }

      //chama a api para cadastrar no banco



    }

    console.log(this.pacienteCadastro)



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

  get telefoneParaContato() {
    return this.formValidation.get('telefoneParaContato')?.value;
  }

  get idade() {
    return this.formValidation.get('idade')?.value;
  }

  get dataDeNascimento() {
    return this.formValidation.get('dataDeNascimento')?.value;
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

  get perfil() {
    return this.formValidation.get('perfil')?.value;
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

  get estado() {
    return this.formValidation.get('estado')?.value;
  }

  get queixa() {
    return this.formValidation.get('queixa')?.value;
  }







}
