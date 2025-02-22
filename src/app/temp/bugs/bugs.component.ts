import { Component, OnInit } from '@angular/core';
import { BugsInterface } from './bugs-interface';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  private URLCarregar: string = 'http://localhost:8080/ocorrencia/carregar';
  private URLRegistrar: string = 'http://localhost:8080/ocorrencia/registrar';
  private URLFinalizar: string = 'http://localhost:8080/ocorrencia/finalizar'
  private unsubscribe$ = new Subject<void>();

  telas: string[] = [
    'Cadastro','Home','Login','Tela paciente','Acompanhamento','Agenda consulta','Financeiro','Identificação',
    'Migrar paciente','Relatório','Laudo','Menu principal','Menu paciente','Mecanismo do sistema'
  ];






  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.carregarBugs();
  }

  bugs: { tela: string; problemas: string[] }[] = []; // Array para armazenar os bugs

  selectedTela: string = ''; // Tela selecionada
  problema: string = ''; // Problema a ser registrado

  registrarBug(): void {
    if (this.selectedTela && this.problema) {
      const newBug: BugsInterface = { tela: this.selectedTela, problema: this.problema };
      this.salvarProblema(newBug).then(success => {
        if (success) {
          this.adicionarBug(newBug); // Atualiza a lista local
          this.selectedTela = '';
          this.problema = '';
        }
      });
    } else {
      alert('Selecione uma tela e insira um problema!');
    }
  }



  private adicionarBug(bug: BugsInterface): void {
    const existingBug = this.bugs.find(b => b.tela === bug.tela);
    if (existingBug) {
      existingBug.problemas.push(bug.problema);
    } else {
      this.bugs.push({ tela: bug.tela, problemas: [bug.problema] });
    }
  }



  protected salvarProblema(bugs: BugsInterface): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.post<BugsInterface>(this.URLRegistrar, bugs, { observe: 'response' })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response: HttpResponse<any>) => { // Aqui você pode usar 'any' se não precisar do corpo
            if (response.status === 200) {
              alert('Problema registrado')
              resolve(true);
            } else {
              resolve(false); // Resolva como false se o status não for 200
            }
          },
          error: (err) => {
            console.error('Erro ao cadastrar:', err);
            resolve(false); // Resolva como false em caso de erro
          }
        })
    })
  }



  private carregarBugs(): void {
    this.http.get<{ tela: string; problema: string }[]>(this.URLCarregar)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          // Transformando os dados para o formato esperado
          const bugsMap: { [key: string]: string[] } = {};

          response.forEach(item => {
            if (!bugsMap[item.tela]) {
              bugsMap[item.tela] = [];
            }
            bugsMap[item.tela].push(item.problema);
          });

          this.bugs = Object.keys(bugsMap).map(tela => ({
            tela,
            problemas: bugsMap[tela]
          }));

          console.log('Bugs carregados:', this.bugs); // Debug
        },
        error: (err) => {
          console.error('Erro ao carregar bugs:', err);
        }
      });
  }



  deletarProblema(tela: string, problema: string): void {
    const confirmacao = confirm(`Finalizar este problema? na tela "${tela}"?`);

    if (confirmacao) {
      this.finalizarBug(tela, problema).then(success => {
        if (success) {
          // Atualizar a lista local após a exclusão
          const bugIndex = this.bugs.findIndex(b => b.tela === tela);
          if (bugIndex !== -1) {
            const problemaIndex = this.bugs[bugIndex].problemas.indexOf(problema);
            if (problemaIndex !== -1) {
              this.bugs[bugIndex].problemas.splice(problemaIndex, 1);
              // Remover o objeto se não tiver mais problemas
              if (this.bugs[bugIndex].problemas.length === 0) {
                this.bugs.splice(bugIndex, 1);
              }
            }
          }
          this.carregarBugs();
        } else {
          alert('Não foi possível excluir o problema. Tente novamente.');
        }
      });
    }
  }


  protected finalizarBug(tela: string, problema: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const body = { tela, problema };

      this.http
        .request('DELETE', this.URLFinalizar, {
          body,
          observe: 'response',
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Resposta recebida:', response);
            resolve(true); // Trata qualquer 2xx como sucesso
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao excluir o problema:', err);
            if (err.status === 200) {
              console.warn('Tratando como sucesso, pois o status é 200.');
              resolve(true); // Trata o caso do Angular interpretar erroneamente como erro
            } else {
              resolve(false); // Retorna false em caso de erro real
            }
          },
        });
    });
  }








    ngOnDestroy() {
      // Emite um valor para cancelar todas as assinaturas
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }



}
