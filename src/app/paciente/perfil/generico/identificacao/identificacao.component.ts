import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';
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
  identificacao: IdentificacaoPacienteInterface | null = {
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
    dataNascimento: new Date(), // ou uma data específica
    estadoCivil: '',
    filhos: null, // ou false se preferir
    qtdFilhos: null, // ou 0 se preferir
    grauEscolaridade: '',
    profissao: '',
    statusPaciente: '',
    perfil: '',
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
      queixa: ''
    }
  } ;


  constructor(
    private loadingDocumentosService: LoadingDocumentosService, private identificacaoService: IdentificacaoService,
    private cacheService: PacienteCacheService, private zone: NgZone
  ) {}


  ngOnInit() {
    // Simula o carregamento de dados
    // this.loadingDocumentosService.boolean$.subscribe(value => {
      // console.log('Valor booleano recebido no filho:', value);
      // if (value) {

      this.loadingDocumentosService.setBoolean(true);


        console.log('Iniciando o carregamento de dados da API...');

        // setTimeout(() => {
          console.log('Aguardando resposta do servidor...');

          // setTimeout(() => {
            console.log('Recemendo os dados ... ');

            // setTimeout(() => {
              console.log('Exibindo os dados em tela ...');

              // Simula o carregamento de dados
              // setTimeout(() => {

                console.log('Dados carregados com sucesso!');
                const storageCPF: string | null = localStorage.getItem('cpf')

                console.log('CPF pesquisado: ', storageCPF)


                // Primeiro verifica em cache, se nao houver então realiza a api

                this.cacheService.getPacienteCache().subscribe((dataCache) => {
                  if(dataCache) {

                    this.identificacao = dataCache;

                    if(this.identificacao != null) {
                      setTimeout(() => {
                        this.loadingDocumentosService.setBoolean(false);
                        this.loadingDocumentosService.setRenderizado(true);
                        this.exibicaoDeConteudo = true;
                    });
                    } else {
                        console.error('Os dados não foram carregados corretamente');
                    }


                  } else {
                    this.identificacaoService.carregarPaciente(storageCPF!).subscribe((paciente) => {
                      if (paciente) {
                        console.log('Chamada nova de paciente realizada:', paciente);

                        this.identificacao = paciente;


                        setTimeout(() => {
                          this.loadingDocumentosService.setBoolean(false);
                          this.loadingDocumentosService.setRenderizado(true);
                          this.exibicaoDeConteudo = true;
                        });

                        console.log('Mudança de estado detectado: ', this.loadingDocumentosService.getRenderizado())

                        // this.loadingDocumentosService.setRenderizado(true)
                      } else {
                        console.warn('Não foi possível carregar o paciente.');
                        this.loadingDocumentosService.setBoolean(false);
                      }
                    });
                  }
                })











                // this.cacheService.getPacienteCache().subscribe((paciente) => {
                //   if (paciente) {
                //     console.log('Paciente carregado do cache:', paciente);
                //   } else {
                //     console.warn('Nenhum paciente armazenado no cache.');
                //   }
                // });






              // }, 500); // Emite o evento após 8 segundos

            // }, 500);


          // }, 4000);


        // }, 4000);


        /**

        Todos esses setTimeouts representa um observable da api assincrona para carregar os dados. Quando os dados
        todos forem carregados e populados então o filho emite a alternação de estado e o pai ouve e renderiza os dados


         */






      // }
    // });
  }

  ngOnDestroy(): void {
    this.loadingDocumentosService.setRenderizado(false)
    console.log('Finalizado Identificação - valor final: ', this.loadingDocumentosService.getRenderizado())
    localStorage.removeItem('paciente')
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }






}
