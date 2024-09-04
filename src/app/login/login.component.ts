import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RedirectComponent } from '../redirect/redirect.component';
import { BehaviorSubject, interval, Observable, Subscription, takeLast } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';
import { Usuario } from './usuario';
import { ApiAutenticacaoService } from '../services/autenticacao/api-autenticacao.service';

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

  private usuarioAutenticado: boolean = false;
  private estadoMensagem: boolean = false;
  private statusInputFocus: boolean = false;
  private tentativasDeAcesso: number = 0

  protected errorMessageLogin: string = '';
  protected errorMessageSenha: string = '';


  protected loginInvalido: boolean = true;
  protected usuario: Usuario = new Usuario();




  constructor(
    private router: Router, private autenticacaoService: AutenticacaoService,
    private apiAutenticacaoService: ApiAutenticacaoService, private formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {
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

  onLogin() {

    const loginValue = this.formularioDeLogin.get('login')!.value;
    const senhaValue = this.formularioDeLogin.get('senha')!.value;

    this.usuario.login = loginValue;
    this.usuario.senha = senhaValue;

    if(!this.validacaoLogin()) {
      return;
    } else {
      this.autenticacaoService.fazerLogin(this.usuario);
      console.log(this.usuario)
    console.log(
      this.login.value,' ',this.senha.value
    )
    }






  }


  setupLoginForm(): void {
    this.formularioDeLogin.get('login')?.valueChanges.subscribe((value: string) => {
      this.formularioDeLogin.get('login')?.patchValue(value.toLowerCase(), { emitEvent: false });
    });
  }


  // fazerLogin(usuario: Usuario) {
  //   // Pausa do vídeo Loiane
  //   //  É aqui que chama a API
  //   if(usuario.login === 'bruno' && usuario.senha === '12345678') {
  //     this.usuarioAutenticado = true;

  //     this.router.navigate(['/page2'])
  //     console.log('Usuário autenticado: ',this.usuarioAutenticado)
  //   } else {
  //     this.usuarioAutenticado = false;
  //     console.log('Usuário autenticado: ',this.usuarioAutenticado)
  //   }

  // }


  statusAutenticacao() {
    return this.usuarioAutenticado;
  }



  validacaoLogin() {

     //Insira o login para acesso
     if(this.usuario.login === '' || this.usuario.login === null) {
      this.errorMessageLogin = 'Insira o login para acesso';
      this.errorMessageSenha = '';

      this.statusInputFocus = false;  // deu submit
      return;
     }

     if(this.usuario.senha === '' || this.usuario.senha === null) {
      this.errorMessageSenha = 'Senha incoreta';
      this.errorMessageLogin = '';

      this.statusInputFocus = false;  // deu submit
      return;
     }

     return true;







    // console.log('Validação no localStarege: Buscando dados')
    // console.log(nomeUsuario)
    // console.log(token)


  }


  focusLoginIn() {
    this.errorMessageLogin = '';
  }

  focusSenhaIn() {
    this.errorMessageSenha = '';
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
