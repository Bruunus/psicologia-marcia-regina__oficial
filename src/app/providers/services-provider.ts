import { NgModule } from "@angular/core";
import { Usuario } from "../model/login/usuario";
import { PacienteSeach } from "../model/home/paciente-seach";
import { MessageCadastroPacienteService } from "../services/messagers/info-message/cadastro-paciente/message-cadastro-paciente.service";

@NgModule({
  providers: [
    MessageCadastroPacienteService
  ]
})
export class ServicesProvider {}
