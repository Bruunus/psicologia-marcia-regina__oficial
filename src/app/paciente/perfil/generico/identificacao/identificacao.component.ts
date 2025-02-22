import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';
import { IdentificacaoUpdatePacienteInterface } from 'src/app/model/documentos/identificacao/indentificacao-update-paciente-interface';
import { IdentificacaoService } from 'src/app/services/api/read/paciente/identificacao/identificacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { LoadingDocumentosService } from 'src/app/services/loading/documentos/loading-documentos.service';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.scss']
})
export class IdentificacaoComponent implements OnInit {

  exibicaoDeConteudo: boolean = false;
  private subscription: Subscription | null = null;
  private dadosEmCache: boolean | null = null;
  private unsubscribe$ = new Subject<void>();
  identificacao: IdentificacaoUpdatePacienteInterface | null = {
    id: 0,
    nomeCompleto: '',
    responsavel: null, // ou '' se preferir
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    telefoneContato: '',
    nomeDoContato: '',
    idade: 0,
    dataNascimento: '', // ou uma data específica
    estadoCivil: '',
    filhos: null, // ou false se preferir
    qtdFilhos: null, // ou 0 se preferir
    grauEscolaridade: '',
    profissao: '',
    endereco: {
      id: 0,
      logradouro: '',
      numero: '',
      complemento: null,
      bairro: '',
      cidade: '',
      uf: '',
      cep: ''
    },
    queixa: {
      id: 0,
      queixa: ''
    }
  } ;


  constructor(
    private loadingDocumentosService: LoadingDocumentosService, private identificacaoService: IdentificacaoService,
    private cacheService: PacienteCacheService, private router: Router
  ) {}


  ngOnInit() {
    // Simula o carregamento de dados
    // this.loadingDocumentosService.boolean$.subscribe(value => {
      // console.log('Valor booleano recebido no filho:', value);
      // if (value) {

      this.loadingDocumentosService.setBoolean(true);
      this.init();
  }

  protected init(): void {


  // if (Object.keys(this.identificacao ).length === 0) {}


    this.cacheService.getStatusCaching().pipe(takeUntil(this.unsubscribe$))
      .subscribe((status) => {
        if (status) {
          this.cacheService.getPacienteCache().pipe(takeUntil(this.unsubscribe$)).subscribe(
            (dataCache => {
              this.identificacao = dataCache;
              setTimeout(() => {
                this.loadingDocumentosService.setBoolean(false);
                this.loadingDocumentosService.setRenderizado(true);
                this.exibicaoDeConteudo = true;
              });
              console.log('Imprimindo a lista direto no Cache: ', this.identificacao);

            })
          )
        } else {
          this.carregarPacienteViaAPI();
        }
      })
  }

  protected carregarPacienteViaAPI(): void {
    const storageCPF: string | null = localStorage.getItem('cpf');
    this.identificacaoService.carregarPaciente(storageCPF!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }



  protected atualizarDados(): void {
    // pode apenas redirecionar para o componente de editar e o componente trás os dados do cache (Melhor performance)
    this.router.navigate([`/paciente/prontuario=${this.identificacao?.id}/documentos/atualizar`]);

  }



  ngOnDestroy(): void {
    // this.dadosEmCache = false;
    this.loadingDocumentosService.setRenderizado(false);
    this.cacheService.clearStatusCaching();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Finalizado Identificação - valor final: ', this.loadingDocumentosService.getRenderizado())
    localStorage.removeItem('paciente')
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }






}
