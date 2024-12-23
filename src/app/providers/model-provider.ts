import { NgModule } from "@angular/core";
import { Usuario } from "../model/login/usuario";
import { PacienteSeach } from "../model/home/paciente-seach";

@NgModule({
  providers: [
    PacienteSeach
  ]
})
export class ModelProvider {}
