import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RedirectComponent } from '../services/redirecting/redirect/redirect.component';
import { BehaviorSubject, interval, Observable, Subscription, takeLast } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';
import { Usuario } from './usuario';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { ErrorService } from '../services/error/error.service';

@Injectable({providedIn: 'root'})
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

  // Angular services
  formularioDeLogin!: FormGroup;
  subscription: Subscription = new Subscription();
  token: string | null = localStorage.getItem('token');

  private usuarioAutenticado: boolean = false;
  private statusInputFocus: boolean = false;
  private errorMessageServer: string = '';
  protected errorMessageLogin: string = '';
  protected errorMessageSenha: string = '';
  protected errorMessageAutenticacao: string = '';
  protected ativarLoading: boolean = false;
  protected loginInvalido: boolean = true;
  protected usuario: Usuario = new Usuario();

  constructor(
    private router: Router, private autenticacaoService: AutenticacaoService
  ) {}


  ngOnInit(): void {

    let token = localStorage.getItem('token');

    if(token) {
      let usuario = localStorage.getItem('usuario');
      // console.log('Usuário que fora logado: ',usuario)   //{Debug}\\
      this.autenticacaoService.deslogar(usuario!);

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      // console.log('Teste após remoção do usuário: ',usuario)   //{Debug}\\
      // console.log('Teste após remoção do token: ',token)   //{Debug}\\

      this.router.navigate(['ending-session']);
    }

    this.formularioDeLogin = new FormGroup({
      login: new FormControl(
        this.usuario.login,
        [
          Validators.required,
          Validators.maxLength(15)
        ]
      ),
      senha: new FormControl(this.usuario.senha, Validators.required)
    })

    this.setupLoginForm();

  }



   /**
    * Método de processamento do autenticação de usuário.
    * @returns
    */
   onLogin() {
    localStorage.removeItem('token');
    this.clearErrorMessage()

    let loginValue = this.formularioDeLogin.get('login')!.value;
    let senhaValue = this.formularioDeLogin.get('senha')!.value;

    this.usuario.login = loginValue;
    this.usuario.senha = senhaValue



    if(this.usuario.login === '' || this.usuario.login === null /* || busca o usuario lá na API */) {
      this.errorMessageLogin = 'Insira o login para acesso';
      this.errorMessageSenha = '';
      this.errorMessageAutenticacao = '';
      this.statusInputFocus = false;  // deu submit
      return;

     } else if(this.usuario.senha === '' || this.usuario.senha === null) {
      this.errorMessageSenha = 'Insira uma senha';
      this.errorMessageLogin = '';
      this.errorMessageAutenticacao = ''
      this.statusInputFocus = false;  // deu submit
      return;
     }

     else {

      this.ativarLoading = true;
      this.autenticacaoService.fazerLogin(this.usuario);


      setTimeout(() => {

        const token = localStorage.getItem('token');

        if(!token) {

          this.ativarLoading = false;
          this.errorMessageAutenticacao = '';
          this.errorMessageSenha = 'Dados de autenticação inválidos, acesso recusado';
          this.errorMessageLogin = '';
          return;
        }

        else if(token) {

          this.formularioDeLogin.get('login')!.setValue('');
          this.formularioDeLogin.get('senha')!.setValue('');

          setTimeout(() => {
            this.ativarLoading = false;
            setTimeout(() => {
              window.location.reload()
            }, 100);  //   tempo para redirecionamento

            this.router.navigate(['authenticating']);
            console.log(this.usuario)  //{Debug}\\

          }, 100);  // tempo para limpar os campos

         } else {
          this.ativarLoading = false;
          this.errorMessageAutenticacao = '';
          this.errorMessageSenha = 'Existe um usuário logado com esta conta, acesso negado.';
          this.errorMessageLogin = '';
          return;
         }

      }, 1500)  // tempo de espera da chegada do token
    }

  }





  setupLoginForm(): void {
    this.formularioDeLogin.get('login')?.valueChanges.subscribe((value: string) => {
      this.formularioDeLogin.get('login')?.patchValue(value.toLowerCase(), { emitEvent: false });
    });
  }




  statusAutenticacao() {
    return this.usuarioAutenticado;
  }



  deletarToken() {
    localStorage.removeItem('token');
    location.reload();
  }




  focusLoginIn() {
    this.errorMessageLogin = '';
  }

  focusSenhaIn() {
    this.errorMessageSenha = '';
  }




  clearErrorMessage() {
    this.errorMessageLogin = '';
    this.errorMessageSenha = '';
    this.errorMessageAutenticacao = ''
  }



  getErrorMessageServer() {
    return this.errorMessageServer;
  }

  setErrorMessageServer(message: string) {
    this.errorMessageServer = message;
  }


  get login(): AbstractControl<string, any> {
    return this.formularioDeLogin.get('login')!;
  }

  get senha(): AbstractControl<string, any> {
    return this.formularioDeLogin.get('senha')!;
  }




  get getStatusInputFocus(): boolean {
    return this.statusInputFocus
  }

  set setStatusInputFocus(status: boolean) {
    this.statusInputFocus = status;
  }






}
