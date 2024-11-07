import { NgModule } from "@angular/core";
import { Usuario } from "../model/usuario";
import { PacienteSeach } from "../model/paciente-seach";

@NgModule({
  providers: [
    PacienteSeach
  ]
})
export class ModelProvider {}
