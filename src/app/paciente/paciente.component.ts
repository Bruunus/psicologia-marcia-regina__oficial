import { Component, OnInit } from '@angular/core';
import { PacienteCompartilhamentoService } from '../services/compartilhamento-de-dados/paciente/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente-style-global.component.scss']
})
export class PacienteComponent implements OnInit {

  paciente: string | undefined;
  itensMenu: string [] = ['Identificação', 'Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
  itemSelecionado: string | null = null;

  constructor(private pacienteCompartilhamentoService: PacienteCompartilhamentoService) {}

  ngOnInit() {
    this.paciente = this.pacienteCompartilhamentoService.getPacienteCpf();

  }

  selecionarItem(item: string) {
    console.log(item)
    this.itemSelecionado = item;
  }


}
