import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAutenticacaoService } from 'src/app/services/autenticacao/api-autenticacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { GerenciadoDeAutenticacaoService } from 'src/app/services/sessao/gerenciador-de-autenticacao.service';
declare var $: any;


@Component({
  selector: 'app-menu-paciente',
  templateUrl: './menu-paciente.component.html',
  styleUrls: ['./menu-paciente-style-global.component.scss']
})
export class MenuPacienteComponent implements OnInit{

  perfil: string | undefined | null = '';
  nomeSessao: string | undefined | null = '';
  usuario: string | null = '';

  private modal: any;

  constructor(private gerenciadoDeAutenticacaoService: GerenciadoDeAutenticacaoService, private router: Router,
    private apiAutenticacaoService: ApiAutenticacaoService, private pacienteCacheService: PacienteCacheService) {

  }

  ngOnInit(): void {

    this.perfil = localStorage.getItem('perfil')
    this.nomeSessao = localStorage.getItem('nomePaciente')

    // this.pacienteCacheService.getPacienteCache().subscribe(
    //   (data) => {
    //     this.perfil = data?.perfil;
    //     this.nomeSessao = data?.nomeCompleto;
    //   }
    // )

    this.usuario = this.gerenciadoDeAutenticacaoService.getUsuario()

  }

  /* Controles do Modal */
  openModal(): void {
    $('#exampleModalCenter').modal('show'); // Abre o modal
  }

  closeModal(): void {
    document.getElementById('safeElement')?.focus();
    $('#exampleModalCenter').modal('hide'); // Fecha o modal
  }

  protected redirectMenu(): void {
    this.closeModal()
    setTimeout(() => {
      localStorage.removeItem('cpf');
      localStorage.removeItem('nomePaciente');
      localStorage.removeItem('perfil');
      this.pacienteCacheService.clearCachePaciente();

      this.router.navigate(['/home/pacientes']);
    }, 450);

  }


  /* Evento do Modal */
  encerrarSessao() {
    this.closeModal()

    setTimeout(() => {
      this.router.navigate(['ending-session']);
      this.apiAutenticacaoService.apiDeslogar(this.usuario!); /* Necessário para atualizar o banco em tempo de execução */
    }, 430);
  }





}
