import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AutenticacaoGuard } from "./services/autenticacao/autenticacao.guard";

@NgModule({
  providers: [
    LoginComponent, AutenticacaoGuard
  ]
})
export class Providers {}
