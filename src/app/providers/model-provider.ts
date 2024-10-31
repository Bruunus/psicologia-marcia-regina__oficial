import { NgModule } from "@angular/core";
import { Usuario } from "../model/usuario";
import { Paciente } from "../model/paciente";

@NgModule({
  providers: [
    Paciente
  ]
})
export class ModelProvider {}
