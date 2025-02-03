import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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


  constructor(
    private loadingDocumentosService: LoadingDocumentosService, private identificacaoService: IdentificacaoService,
    private cacheService: PacienteCacheService
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

                this.identificacaoService.carregarPaciente(storageCPF!).subscribe((paciente) => {
                  if (paciente) {
                    console.log('Paciente recebido:', paciente);
                    this.loadingDocumentosService.setBoolean(false);
                    this.exibicaoDeConteudo = true;
                  } else {
                    console.warn('Não foi possível carregar o paciente.');
                    this.loadingDocumentosService.setBoolean(false);
                  }
                });



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





}
