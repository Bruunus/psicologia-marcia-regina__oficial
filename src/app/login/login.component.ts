import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoInterface } from 'src/model/interfaces/autenticacaoInterface';
import { RedirectComponent } from '../redirect/redirect.component';

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

  constructor(private router: Router) {

  }


  ngOnInit(): void {
    this.formValidation = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', Validators.required)
    })
  }





  onLogin(): boolean {


    const isAuthenticated = true;

    this.autenticacao = {
      login: this.login.value,
      senha: this.senha.value
    }

    console.log('Autenticação: ', this.autenticacao);

    if (isAuthenticated) {
      this.router.navigate(['/laudos/page2']); // Redireciona para a rota '/dashboard' após o login
      return true;
    } else {
      // Tratar caso de login inválido
      return false;
    }





  }


  get login(): AbstractControl<FormControl, any> {
    return this.formValidation.get('login')!;
  }

  get senha(): AbstractControl<FormControl, any> {
    return this.formValidation.get('senha')!;
  }

}
