import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private server: string = 'localhost';
  private port: string = '8080';


  // Authentication
  private login: string = `http://${this.server}:${this.port}/auth/login`;
  private logout: string = `http://${this.server}:${this.port}/auth/deslogar`;
  private statusUpdate: string = `http://${this.server}:${this.port}/status-update`;

  // Home
  private loadPatientsHome: string = `http://${this.server}:${this.port}/paciente/carregar-tela-home`;


  // Patient
  private registerPatient: string = `http://${this.server}:${this.port}/paciente/cadastro`;
  private getPatientData: string = `http://${this.server}:${this.port}/paciente/carregar-dados`;

  constructor() { }


  // Authentication getter
  get urlLogin(): string { return this.login; };
  get urlLogout(): string { return this.logout; };
  get urlStatusUpdate(): string { return this.statusUpdate; };

  // Home getter
  get urlCarregarPacienteTelaHome(): string { return this.loadPatientsHome; };

  // Patient
  get urlRegistrarPaciente(): string { return this.registerPatient; };
  get urlDadosDoPaciente(): string { return this.getPatientData; };



}
