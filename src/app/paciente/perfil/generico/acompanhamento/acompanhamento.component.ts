import { Component, OnInit } from '@angular/core';
import { LoadingDocumentosService } from 'src/app/services/loading/documentos/loading-documentos.service';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.component.html',
  styleUrls: ['./acompanhamento.component.scss']
})
export class AcompanhamentoComponent implements OnInit {


  exibicaoDeConteudo: boolean = false;

  constructor(private loadingDocumentosService: LoadingDocumentosService) {}


  ngOnInit() {
    // Simula o carregamento de dados
    this.loadingDocumentosService.boolean$.subscribe(value => {
      // console.log('Valor booleano recebido no filho:', value);
      if (value) {
        console.log('Iniciando o carregamento de dados da API...');

        setTimeout(() => {
          console.log('Aguardando resposta do servidor...');

          setTimeout(() => {
            console.log('Recemendo os dados ... ');

            setTimeout(() => {
              console.log('Exibindo os dados em tela ...');

              // Simula o carregamento de dados
              setTimeout(() => {

                console.log('Dados carregados com sucesso!');
                this.loadingDocumentosService.setBoolean(false); // interrompo o loading
                this.exibicaoDeConteudo = true;
              }, 500); // Emite o evento após 8 segundos

            }, 500);


          }, 4000);


        }, 4000);


        /**

        Todos esses setTimeouts representa um observable da api assincrona para carregar os dados. Quando os dados
        todos forem carregados e populados então o filho emite a alternação de estado e o pai ouve e renderiza os dados


         */






      }
    });
  }


}
