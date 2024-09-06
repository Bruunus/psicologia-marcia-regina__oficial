import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {

  private timeout: any;
  private readonly SESSION_TIMEOUT = 5 * 60 * 60 * 1000; /* 5 horas para o timeout */

  constructor(private router: Router) {

   }

   initSessionTimeout() {
    this.resetSessionTimeout();
    document.addEventListener('mousemove', () => this.resetSessionTimeout());
    document.addEventListener('keypress', () => this.resetSessionTimeout());
   }


   private resetSessionTimeout() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (localStorage.getItem('token')) {
        this.logout();
      }
    }, this.SESSION_TIMEOUT);

   }

   private logout() {
    console.log('Finalizando sessão');
    localStorage.removeItem('token');

    setTimeout(() => {
      window.location.reload()
    }, 100);

    this.router.navigate(['ending-session']);
   }
}
