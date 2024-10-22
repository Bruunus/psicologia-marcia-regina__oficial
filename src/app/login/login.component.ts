import { Component, Injectable, OnInit, TestabilityRegistry } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from './usuario';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';

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
  // token: string | null = localStorage.getItem('token');

  private usuarioAutenticado: boolean = false;
  private statusInputFocus: boolean = false;
  private errorMessageServer: string = '';
  protected errorMessageLogin: string = '';
  protected errorMessageSenha: string = '';
  protected errorMessageAutenticacao: string = '';
  protected ativarLoading: boolean = false;
  protected loginInvalido: boolean = true;
  protected usuario: Usuario = new Usuario();

  constructor(private router: Router, private apiAutenticacaoService: ApiAutenticacaoService,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService) {}


  ngOnInit(): void {
    this.gerenciadoDeAutenticacaoService.clearUserData();
    if(!this.gerenciadoDeAutenticacaoService.getToken()) {
      const token = this.gerenciadoDeAutenticacaoService.setToken(null);
      // console.log('Token de sessão: ', token) //{Debug}\\
    }

    this.formularioDeLogin = new FormGroup({
      login: new FormControl(this.usuario.login,[Validators.required, Validators.maxLength(15)]),
      senha: new FormControl(this.usuario.senha, Validators.required)
    })

    this.setupLoginForm();

  }



   /**
    * Método de processamento do autenticação de usuário. O primeiro bloco vai seguir com regras de entrada e,
    * o bloco do else segue com o processamento caso nenhuma das opções seja verdadeira.
    * @returns
    */
   onLogin() {

    this.clearErrorMessage();

    let loginValue = this.formularioDeLogin.get('login')!.value;
    let senhaValue = this.formularioDeLogin.get('senha')!.value;

    this.usuario.login = loginValue;
    this.usuario.senha = senhaValue

    if(this.usuario.login === '' || this.usuario.login === null) {
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
      console.log(this.usuario)
      this.apiAutenticacaoService.apiAutenticacao(this.usuario);

      setTimeout(() => {

        const token = this.gerenciadoDeAutenticacaoService.getToken();

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




  /**
   * Funcionalidade para regular o input do usuário como regra para aceitar o login somente com
   * letra minúscula
   */
  private setupLoginForm(): void {
    this.formularioDeLogin.get('login')?.valueChanges.subscribe((value: string) => {
      this.formularioDeLogin.get('login')?.patchValue(value.toLowerCase(), { emitEvent: false });
    });
  }





  /**
   * Adiciona o focused para limpar o input
   */
  protected onFocusPlaceHolder(event: Event) {
    const target = event.target as HTMLInputElement;
    target.classList.add('focused');
  }

  protected onBlurPlaceHolder(event: Event) {
    const target = event.target as HTMLInputElement;
    target.classList.remove('focused');
  }

  protected onFocusLetterSpacing(event: Event) {
    const target = event.target as HTMLInputElement;
    target.classList.add('letter-spacing'); // Adiciona a classe ao focar
  }

  protected onBlurLetterSpacing(event: Event) {
    const target = event.target as HTMLInputElement;
    // Remove a classe se o input estiver vazio
    if (target.value === '') {
      target.classList.remove('letter-spacing');
    }
  }

  protected onInputDetectorLetterSpacing(event: Event) {
    const target = event.target as HTMLInputElement;
    // Adiciona a classe se houver caracteres, remove se estiver vazio
    if (target.value.length > 0) {
      target.classList.add('letter-spacing');
    } else {
      target.classList.remove('letter-spacing');
    }
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
