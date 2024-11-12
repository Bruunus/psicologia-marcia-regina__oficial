import { NgModule } from "@angular/core";
import { Usuario } from "../model/usuario";
import { PacienteSeach } from "../model/paciente-seach";
import { MessageCadastroPacienteService } from "../services/messagers/info-message/cadastro-paciente/message-cadastro-paciente.service";

@NgModule({
  providers: [
    MessageCadastroPacienteService
  ]
})
export class ServicesProvider {}
