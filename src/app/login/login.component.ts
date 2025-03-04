import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeLast, takeUntil } from 'rxjs';
import { Usuario } from '../model/login/usuario';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';
import { GerenciadoDeAutenticacaoService } from '../services/sessao/gerenciador-de-autenticacao.service';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-pagina1',
  templateUrl: './login.component.html',
  styleUrls: [
    './login-style-global.component.scss',
    './login-extra-large.component.scss',
    './login-large.component.scss',
    './login-medium.component.scss',
    './login-small.component.scss',
    './login-smartphone.component.scss',
    '../../styles.scss'
  ]
})
export class LoginComponent implements OnInit {

  // Angular services
  formularioDeLogin!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  // token: string | null = localStorage.getItem('token');

  private usuarioAutenticado: boolean = false;
  private statusInputFocus: boolean = false;
  protected errorMessage: string = '';
  protected errorMessageLogin: string = '';
  protected errorMessageSenha: string = '';
  protected errorMessageAutenticacao: string = '';
  protected ativarLoading: boolean = false;
  protected loginInvalido: boolean = true;
  protected usuario: Usuario;

  constructor(private router: Router, private apiAutenticacaoService: ApiAutenticacaoService,
    private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService) {
      this.usuario = new Usuario();
    }


  ngOnInit(): void {

    // Verificação dos itens do localSto
    // console.log('Lista de storages do sistema:')
    // let i = localStorage.length - 1; // Comece pelo último item
    // while (i >= 0) {
    //   const key = localStorage.key(i) ?? ''; // Garante que key não seja null
    //   localStorage.removeItem(key); // Remove o item com a chave obtida
    //   i--; // Decrementa o índice
    // }

    this.gerenciadoDeAutenticacaoService.clearUserData();
    if(!this.gerenciadoDeAutenticacaoService.getToken()) {
      const token = this.gerenciadoDeAutenticacaoService.setToken(null);
      // console.log('Token de sessão: ', token) //{Debug}\\
    }

    this.formularioDeLogin = new FormGroup({
      login: new FormControl(this.usuario.login,[Validators.required, Validators.maxLength(15)]), //Isso significa que, ao criar o formulário, o campo login será preenchido com o valor atual da propriedade login do objeto usuario.
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

    console.log(
      this.usuario.login+"\n"+
      this.usuario.senha
    )

    if(this.usuario.login === '' || this.usuario.login === null) {
      this.errorMessage = 'Insira o login para acesso';
      this.statusInputFocus = false;  // deu submit
      return;

     } else if(this.usuario.senha === '' || this.usuario.senha === null) {
      this.errorMessageSenha = 'Insira a senha';
      this.statusInputFocus = false;  // deu submit
      return;
     }

     else {

      this.ativarLoading = true;
      // console.log(this.usuario)    //{Debug}\\

      this.apiAutenticacaoService.apiAutenticacao(this.usuario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (isAuthenticated) => {

          if (!isAuthenticated) {
            this.ativarLoading = false;
            this.errorMessage = this.gerenciadoDeAutenticacaoService.getErrorMessage();
            return;
          }


          // Limpar os campos de entrada
          this.formularioDeLogin.get('login')!.setValue('');
          this.formularioDeLogin.get('senha')!.setValue('');

          // Redirecionar após autenticação bem-sucedida
          this.ativarLoading = false;
          this.router.navigate(['redirect-home']);

          // setTimeout(() => {
          //   this.ativarLoading = false;
          //   this.router.navigate(['redirect-home']);
          // }, 200);
        }
      })

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
    this.clearErrorMessage()
    this.clearErrorMessageSenha()
  }

  focusSenhaIn() {
    this.errorMessageSenha = '';
    this.clearErrorMessageSenha()
  }




  clearErrorMessage() {
    this.errorMessage = '';
    this.errorMessageLogin = '';
    this.errorMessageAutenticacao = ''
  }

  clearErrorMessageSenha() {
    this.errorMessageSenha = '';
  }



  getErrorMessage() {
    return this.errorMessage;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
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


  ngOnDestroy() {
    // Emite um valor para cancelar todas as subscriptions
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }




}
