import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  path: string = '';

  constructor(private router: Router) { }

  redirect(path: string, delay: number = 500): void {
    // if (path === '') {
    //   console.error('Path is empty. Cannot redirect.');
    //   return;
    // }
    setTimeout(() => {
      this.router.navigate([path]);
    }, delay);

  }

}
