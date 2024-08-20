import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoInterface } from 'src/model/interfaces/autenticacaoInterface';
import { RedirectComponent } from '../redirect/redirect.component';
import { AutenticacaoService } from '../services/autenticacao/autenticacaoService';

@Component({
  selector: 'app-pagina1',
  templateUrl: './login.component.html',
  styleUrls: [
    './style-big-responsive.scss',
    './style-middle-responsive.scss',
    './style-small-responsive.scss',
    '../../styles.scss'
  ]
})
export class LoginComponent implements OnInit {

  formValidation!: FormGroup;

  autenticacao: AutenticacaoInterface = {
    login: new FormControl,
    senha: new FormControl
  }

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.formValidation = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', Validators.required)
    })
  }





  onLogin(): void {

    this.autenticacao = {
      login: this.login.value,
      senha: this.senha.value
    }

    console.log('Autenticação: ', this.autenticacao);

    this.autenticacaoService.login(this.autenticacao);




  }


  get login(): AbstractControl<FormControl, any> {
    return this.formValidation.get('login')!;
  }

  get senha(): AbstractControl<FormControl, any> {
    return this.formValidation.get('senha')!;
  }

}
