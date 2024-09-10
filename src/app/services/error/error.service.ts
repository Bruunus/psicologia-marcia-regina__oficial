import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorMessageServer = ''

  constructor() { }

  getErrorMessageLogin(): string {
    return this.errorMessageServer;
  }

  setErrorMessageLogin(message: string) {
    this.errorMessageServer = message;
  }

}
