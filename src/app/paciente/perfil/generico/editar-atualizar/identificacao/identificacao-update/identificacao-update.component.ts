import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IdentificacaoPacienteInterface } from 'src/app/model/documentos/identificacao/identificacao-paciente-interface';
import { IdentificacaoService } from 'src/app/services/api/read/paciente/identificacao/identificacao.service';
import { PacienteCacheService } from 'src/app/services/cache/paciente/paciente-cache.service';
import { UnsubscribeService } from 'src/app/services/system-support/unsubscribes/unsubscribe.service';

@Component({
  selector: 'app-identificacao-update',
  templateUrl: './identificacao-update.component.html',
  styleUrls: ['./identificacao-update.component.scss']
})
export class IdentificacaoUpdateComponent implements OnInit {



  protected formValidation: FormGroup;

  identificacaoUpdateCache: IdentificacaoPacienteInterface | null = {
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


  constructor(private cacheService: PacienteCacheService, private unsubscribe: UnsubscribeService,
    private identificacaoService: IdentificacaoService
  ) {

    this.formValidation = new FormGroup({
      id: new FormControl({value: null, disabled: true})
    })

  }

  ngOnInit(): void {

    this.cacheService.getStatusCaching().pipe(
      takeUntil(this.unsubscribe.unsubscribe)
    ).subscribe((status) => {
      if (status) {
        this.cacheService.getPacienteCache().pipe(
          takeUntil(this.unsubscribe.unsubscribe)
        ).subscribe(
          (dataUpdate => {
            this.identificacaoUpdateCache = dataUpdate;
            console.log('Dados para serem atualizados: ', this.identificacaoUpdateCache?.id);

            this.formValidation.patchValue({
              id: this.identificacaoUpdateCache!.id
            })
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
      .pipe(takeUntil(this.unsubscribe.unsubscribe))
      .subscribe(
        (dataUpdate => {
          this.identificacaoUpdateCache = dataUpdate;
          // console.log('Dados para serem atualizados: ', this.identificacaoUpdateCache?.id);

          this.formValidation.patchValue({
            id: this.identificacaoUpdateCache!.id
          })
        })
      );
  }

  protected atualizarPaciente(): void {

  }


  ngOnDestroy(): void {
    this.cacheService.clearStatusCaching();
  }
}
