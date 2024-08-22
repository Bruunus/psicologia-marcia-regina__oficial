import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoInterface } from 'src/model/interfaces/autenticacaoInterface';
import { RedirectComponent } from '../redirect/redirect.component';

@Injectable()
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

  isAuthenticated: boolean = false;

  autenticacao: AutenticacaoInterface = {
    login: '',
    senha: ''
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

    this.autenticacao = {
      login: this.login.value,
      senha: this.senha.value
    }

    // console.log('Autenticação: ', this.autenticacao);

    if (this.autenticacao.login === 'brunus-adm' &&
      this.autenticacao.senha === '123'
    ) {
      this.isAuthenticated = true;
      console.log('Comparando os valores ...')
      console.log(this.autenticacao.login )
      console.log(this.autenticacao.senha )

      console.log('Valor atribuido do setUsuarioAutenticado para => ', this.isAuthenticated)
      this.router.navigate(['/laudos/page2'])


      return true;

    } else {
      this.isAuthenticated = false;
      this.router.navigate(['/login'])
      console.log('user nao autenticado')
      console.log('dados do login ', this.autenticacao)


      return false;

    }


  }

  autenticado() {
    return this.isAuthenticated;
  }


  get login(): FormControl {
    return this.formValidation.get('login')! as FormControl;
  }

  get senha(): FormControl {
    return this.formValidation.get('senha')! as FormControl;
  }





}
